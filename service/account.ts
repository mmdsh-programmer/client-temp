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

import { IGetTokenResponse, IHandshake } from "@interface/app.interface";
import { bracketStringify } from "@utils/index";
import { getRedisClient } from "@utils/redis";
import { userInfo } from "./clasor";

const axiosAccountsInstance = axios.create({
  baseURL: process.env.ACCOUNTS,
});

axiosAccountsInstance.interceptors.request.use((request) => {
  const { headers, baseURL, method, url, data } = request;
  const log = {
    type: "REQUEST_ERROR",
    headers,
    baseURL,
    method,
    url,
    data,
  };

  console.log(JSON.stringify(log, null, 0));
  return request;
});

axiosAccountsInstance.interceptors.response.use(
  (response) => {
    const { data, status } = response;
    const log = {
      type: "RESPONSE_ERROR",
      data,
      status,
    };
    console.log(JSON.stringify(log, null, 0));
    return response;
  },
  (error) => {
    const log = {
      type: "ERROR",
      message: error.message,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data,
      },
      response: {
        status: error.response?.status,
        data: error.response?.data,
      },
    };
    console.log(JSON.stringify(log, null, 0));
    return Promise.reject(error);
  },
);

// TODO: proper handler for error

export const handleAccountStatusError = (error: AxiosError<unknown>) => {
  if (isAxiosError(error)) {
    const message = [
      (error as { response?: { data?: { messages?: string[] } } }).response?.data?.messages?.[0] ||
        error.message,
    ];
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
        throw new ServerError(["خطا در ارتباط با سرویس خارجی"], error as IOriginalError);
    }
  } else {
    throw new ServerError(["حطای نامشخصی رخ داد"]);
  }
};

export const getPodAccessToken = async (
  code: string,
  redirectUrl: string,
  clientId: string,
  clientSecret: string,
  domain: string,
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
    const result = await axiosAccountsInstance.post<IGetTokenResponse>(url, options, {
      headers,
    });

    const expiresAt = result.data.expires_in;
    const userData = await userInfo(result.data.access_token, domain, expiresAt);
    if (userData) {
      const redisClient = await getRedisClient();
      await redisClient?.set(`user:${result.data.access_token}`, JSON.stringify(userData), {
        EX: expiresAt,
      });
    }

    return result.data;
  } catch (error) {
    return handleAccountStatusError(error as AxiosError<unknown>);
  }
};

export const revokePodToken = async (
  username,
  password,
  token: string,
  type: string,
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
      },
    );
  } catch (error) {
    return handleAccountStatusError(error as AxiosError<unknown>);
  }
};

export const refreshPodAccessToken = async (
  refreshToken: string,
  clientId: string,
  clientSecret: string,
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
      },
    );

    return result.data as {
      access_token: string;
      refresh_token: string;
      expires_in: number;
    };
  } catch (error) {
    return handleAccountStatusError(error as AxiosError<unknown>);
  }
};

export const handshake = async (accessToken: string): Promise<IHandshake> => {
  try {
    const url = "/handshake/users";
    const options = {
      keyAlgorithm: "RSA",
      keyFormat: "PEM",
      renew: true,
    };
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const result = await axiosAccountsInstance.post<IHandshake>(url, options, {
      headers,
    });

    return result.data;
  } catch (error) {
    return handleAccountStatusError(error as AxiosError<unknown>);
  }
};

export const initiateAutoLogin = async (
  keyId: string,
  timestamp: number,
  signature: string,
  accessToken: string
): Promise<any> => {
  try {
    const url = "/oauth2/submit/autoLogin";
    const options = {
      key_id: keyId,
      timestamp,
      signature,
      access_token: accessToken,
      scope: "write"
    };
    const headers = {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const result = await axiosAccountsInstance.post<any>(url, options, {
      headers,
      params:{
         scope: "write"
      }
    });


    return result.data;
  } catch (error) {
    console.log("--------------- error ---------------------", (error as any).response.data);
    return handleAccountStatusError(error as AxiosError<unknown>);
  }
};
