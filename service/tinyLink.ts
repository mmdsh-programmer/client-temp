import axios, { AxiosError } from "axios";
import { ITinyActionError } from "@hooks/tinyLink/useCreateTinyLink";
import Logger from "@utils/logger";
import {
  AuthorizationError,
  InputError,
  DuplicateError,
  ServerError,
} from "@utils/error";

const { TINY_LINK_BASE_URL, API_TOKEN } = process.env;

const axiosTinyLinkInstance = axios.create({
  baseURL: TINY_LINK_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosTinyLinkInstance.interceptors.request.use((request) => {
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

axiosTinyLinkInstance.interceptors.response.use((response) => {
  const { data, status } = response;

  const log = JSON.stringify({
    data,
    status,
  });

  Logger.info(log);
  return response;
});

export const handleTinyLinkStatusError = (
  error: AxiosError<ITinyActionError> | ITinyActionError
) => {
  const message = error.message ?? "خطای نامشخصی رخ داد";
  switch (error.code) {
    case 401:
      throw new AuthorizationError([message]);
    case 114:
    case 116:
    case 120:
      throw new InputError([message]);
    case 121:
    case 119:
      throw new DuplicateError([message]);
    default:
      throw new ServerError([message]);
  }
};

export const createTinyLink = async (url: string) => {
  try {
    const response = await axiosTinyLinkInstance.post<ITinyActionError>(
      "tiny/add",
      {},
      {
        headers: {
          _token_: API_TOKEN,
        },
        params: {
          urlOrContent: url,
          shortenObjectKind: "link",
        },
      }
    );

    if (response.data.error) {
      return handleTinyLinkStatusError(response.data);
    }

    return response.data;
  } catch (error) {
    return handleTinyLinkStatusError(error as AxiosError<ITinyActionError>);
  }
};
