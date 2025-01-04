import {
  AuthorizationError,
  ForbiddenError,
  IOriginalError,
  InputError,
  NotFoundError,
  ServerError,
  UnprocessableError,
} from "@utils/error";
import axios, { AxiosError, isAxiosError } from "axios";

import { IGetTokenResponse } from "@interface/app.interface";
import Logger from "@utils/logger";
import { bracketStringify } from "@utils/index";

const axiosAccountsInstance = axios.create({
  baseURL: process.env.ACCOUNTS,
});

axiosAccountsInstance.interceptors.request.use((request) => {
  const { headers, baseURL, method, url, data } = request;
  const log = JSON.stringify({
    headers,
    baseURL,
    method,
    url,
    data,
  });

  Logger.info(log);
  return request;
});

axiosAccountsInstance.interceptors.response.use((response) => {
  const { data, status } = response;

  const log = JSON.stringify({
    data,
    status,
  });

  Logger.info(log);
  return response;
});

// TODO: proper handler for error

export const handleAccountStatusError = (error: AxiosError<any>) => {
  if (isAxiosError(error)) {
    const message = [error.response?.data?.messages?.[0] || error.message];
    switch (error.response?.status) {
      case 400:
        throw new InputError(message, error as IOriginalError);
      case 401:
        throw new AuthorizationError(message, error as IOriginalError);
      case 403:
        throw new ForbiddenError(message, error as IOriginalError);
      case 404:
        throw new NotFoundError(message, error as IOriginalError);
      case 422:
        throw new UnprocessableError(message, error as IOriginalError);
      default:
        throw new ServerError(
          ["خطا در ارتباط با سرویس خارجی"],
          error as IOriginalError
        );
    }
  } else {
    throw new ServerError(["حطای نامشخصی رخ داد"]);
  }
};

export const getPodAccessToken = async (
  code: string,
  redirectUrl: string,
  clientId: string,
  clientSecret: string
): Promise<IGetTokenResponse> => {
  try {
    const url = "/oauth2/token";
    const options = {
      code,
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUrl,
    };
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const result = await axiosAccountsInstance.post<IGetTokenResponse>(
      url,
      options,
      {
        headers,
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const revokePodToken = async (
  username,
  password,
  token: string,
  type: string
): Promise<void> => {
  try {
    const url = "/oauth2/token/revoke";
    await axiosAccountsInstance.post(
      url,
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username,
          password,
        },
        params: {
          token_type_hint: type,
          token,
        },
      }
    );
  } catch (error) {
    return handleAccountStatusError(error as AxiosError<any>);
  }
};

export const refreshPodAccessToken = async (
  refreshToken: string,
  clientId: string,
  clientSecret: string
) => {
  try {
    const url = "/oauth2/token";
    const result = await axiosAccountsInstance.post<{
      access_token: string;
      refresh_token: string;
    }>(
      url,
      bracketStringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return result.data as { access_token: string; refresh_token: string };
  } catch (error) {
    return handleAccountStatusError(error as AxiosError<any>);
  }
};
