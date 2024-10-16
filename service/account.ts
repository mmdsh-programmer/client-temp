import { IGetTokenResponse } from "@interface/app.interface";
import Logger from "@utils/logger";
import axios from "axios";

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