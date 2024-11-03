import axios, { AxiosError } from "axios";
import { IClasorError } from "@interface/app.interface";
import { ITinyActionError } from "@hooks/tinyLink/useCreateTinyLink";
import Logger from "@utils/logger";
import { handleClasorStatusError } from "./clasor";

const { TINY_LINK_BASE_URL, API_TOKEN } = process.env;

const axiosClasorInstance = axios.create({
  baseURL: TINY_LINK_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClasorInstance.interceptors.request.use((request) => {
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

axiosClasorInstance.interceptors.response.use((response) => {
  const { data, status } = response;

  const log = JSON.stringify({
    data,
    status,
  });

  Logger.info(log);
  return response;
});

export const createTinyLink = async (access_token: string, url: string) => {
  try {
    const response = await axiosClasorInstance.post<ITinyActionError>(
      `tiny/add?urlOrContent=${url}&shortenObjectKind=link`,
      {},
      {
        headers: {
          _token_: API_TOKEN,
        },
      }
    );
    return response.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};
