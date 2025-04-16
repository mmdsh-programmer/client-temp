import {
  AuthorizationError,
  DuplicateError,
  InputError,
  ServerError,
} from "@utils/error";
import axios, { AxiosError } from "axios";

import { ITinyActionError } from "@hooks/tinyLink/useCreateTinyLink";

const { TINY_LINK_BASE_URL, API_TOKEN } = process.env;

const axiosTinyLinkInstance = axios.create({
  baseURL: TINY_LINK_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosTinyLinkInstance.interceptors.request.use(
  (request) => {
    const { headers, baseURL, method, url, data } = request;
    const log = {
      headers,
      baseURL,
      method,
      url,
      data,
    };

    console.log(JSON.stringify(log, null, 0));
    return request;
  },
  (error) => {
    const log = {
      type: "REQUEST_ERROR",
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
  }
);

axiosTinyLinkInstance.interceptors.response.use(
  (response) => {
    const { data, status } = response;
    const log = {
      data,
      status,
    };
    console.log(JSON.stringify(log, null, 0));
    return response;
  },
  (error) => {
    const log = {
      type: "RESPONSE_ERROR",
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
  }
);

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
