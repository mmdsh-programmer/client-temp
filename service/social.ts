import {
  AuthorizationError,
  InputError,
  NotFoundError,
  ServerError,
  TimeoutError,
} from "@utils/error";
import {
  ICustomPostMetadata,
  IMetaQuery,
  ISocialError,
  ISocialResponse,
} from "@interface/app.interface";
import axios, { AxiosError } from "axios";

import Logger from "@utils/logger";
import crypto from "crypto";

const axiosSocialInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    _token_: process.env.API_TOKEN,
    _token_issuer_: "1",
  },
});

axiosSocialInstance.interceptors.request.use((request) => {
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

axiosSocialInstance.interceptors.response.use((response) => {
  const { data, status } = response;

  const log = JSON.stringify({
    data,
    status,
  });

  Logger.info(log);
  return response;
});

export const handleSocialStatusError = (
  error: AxiosError<ISocialError> | ISocialResponse
) => {
  if ("hasError" in error) {
    const message = error.message ?? "خطای نامشخصی رخ داد";
    switch (error.errorCode) {
      case 193:
        throw new InputError([message]);
      case 40: // Unauthorized
        throw new AuthorizationError([message]);
      case 408: // Unauthorized
        throw new TimeoutError([message]);
      default:
        throw new ServerError([message]);
    }
  } else {
    throw new ServerError(["خطای نامشخصی رخ داد"]);
  }
};

export const createCustomPost = async (metadata: string, domain: string) => {
  const uniqueId = crypto.createHash("sha256").update(domain).digest("base64");
  const response = await axiosSocialInstance.post(
    "/biz/addCustomPost",
    {},
    {
      params: {
        name: "DOMAIN_BUSINESS",
        content: JSON.stringify({}),
        enable: "true",
        metadata,
        uniqueId,
      },
    }
  );
  if (response.data.hasError) {
    return handleSocialStatusError(response.data);
  }
  return response.data;
};

export const getCustomPost = async (
  metaQuery: IMetaQuery,
  size: string,
  offset: string
) => {
  const response = await axiosSocialInstance.get(
    "/biz/searchTimelineByMetadata",
    {
      params: {
        metaQuery: JSON.stringify(metaQuery),
        activityInfo: false,
        size,
        offset,
      },
    }
  );
  if (response.data.hasError) {
    return handleSocialStatusError(response.data);
  }
  return response.data;
};

export const getCustomPostByDomain = async (
  domain: string
): Promise<ICustomPostMetadata> => {
  const metaQuery: IMetaQuery = {
    field: "CUSTOM_POST_TYPE",
    is: "DOMAIN_BUSINESS",
    and: [
      {
        field: "domain",
        is: domain,
      },
    ],
  };
  const size = "1";
  const offset = "0";

  // const response = await axiosSocialInstance.get(
  //   "/biz/searchTimelineByMetadata",
  //   {
  //     params: {
  //       metaQuery: JSON.stringify(metaQuery),
  //       activityInfo: false,
  //       size,
  //       offset,
  //     },
  //   }
  // );

  const response = {
    "item": {
      "id": 1447872,
      "version": 19,
      "timelineId": 602177,
      "entityId": 363339,
      "forwardedId": 0,
      "numOfLikes": 0,
      "numOfDisLikes": 0,
      "numOfSaved": 0,
      "numOfShare": 0,
      "numOfFavorites": 0,
      "numOfComments": 0,
      "timestamp": 1728378567964,
      "enable": true,
      "hide": false,
      "replyPostConfirmation": false,
      "business": {
          "id": 21265,
          "name": "DMS-Sandbox",
          "numOfProducts": 0,
          "rate": {
              "rate": 0,
              "rateCount": 0
          },
          "ssoId": "18682629"
      },
      "rate": {
          "rate": 0,
          "rateCount": 0
      },
      "metadata": "{\"domain\":\"localhost:3000\",\"clientId\":\"18682629g64434d74b0004e8ecb3d3be1\",\"type\":\"clasor\",\"clientSecret\":\"em7b2e01858bent\",\"cryptoSecretKey\":\"340833fec55c3bb3d4687f0b778d995aca29e5c5cf9779d38bf2d7fc7d21fb19\",\"cryptoInitVectorKey\":\"a55f5ffa68b6ff6553f7414ff199a2b3\",\"CUSTOM_POST_TYPE\":\"DOMAIN_BUSINESS\"}",
      "latitude": 0,
      "longitude": 0,
      "uniqueId": "SZYN5YgOjGh0NBcPZHZgW4/krrmihjLHmVzzuoMdl2M=",
      "canComment": true,
      "canLike": true,
      "canRate": true,
      "tags": [],
      "tagTrees": [],
      "data": "{\"--bg-primary-color\":\"#FFFFFF\",\"--bg-secondary-color\":\"#F5F7FA\",\"--bg-tertiary-color\":\"#F2F2F7\",\"--gray-50\":\"#F6F7F8\",\"--gray-100\":\"#EEF0F2\",\"--gray-200\":\"#ECECEE\",\"--gray-300\":\"#CED4D9\",\"--gray-400\":\"#9AA6B1\",\"--gray-500\":\"#71717A\",\"--gray-700\":\"#414147\",\"--gray-800\":\"#1B1B1D\",\"--gray-900\":\"#181C20\",\"--purple-normal\":\"#7446B2\",\"--purple-light\":\"#F1EDF7\",\"--icon-active\":\"#181C20\",\"--icon-hover\":\"#667585\",\"--critical-normal\":\"#E03E1A\",\"--error\":\"#E03E1A\",\"--success-normal\":\"#1F7A37\",\"--success-secondary\":\"#F7FDF8\",\"--info\":\"#0C8CE9\",\"--info-secondary\":\"#E7F5FD\",\"--border-normal\":\"#EEF0F2\",\"--text-primary\":\"#0C0E10\",\"--text-secondary\":\"#667585\",\"--text-hint\":\"#9AA6B1\",\"--text-placeholder\":\"#98A2B3\",\"--text-disabled\":\"#9AA6B1\",\"--text-primary-normal\":\"#7446B2\",\"--text-link\":\"#0C8CE9\", \"logo\": \"CA69OKRSAQ33NWXC\", \"projectDescription\": \"سیستم مدیریت اسناد\", \"projectName\": \"کلاسور\"}",
      "categoryList": [],
      "pin": false
  }
  }

  // if (response.data.hasError) {
  //   return handleSocialStatusError(response.data);
  // }

  // if (!response.data.result.length) {
  //   throw new NotFoundError(["Domain not found"]);
  // }
  const customPost = response.item;
  const { metadata } = customPost;
  return {
    ...JSON.parse(metadata),
    id: customPost.entityId,
    data: customPost.data ?? "0",
  };
};

export const getCustomPostById = async (
  id: number
): Promise<ICustomPostMetadata> => {
  const metaQuery: IMetaQuery = {
    field: "CUSTOM_POST_TYPE",
    is: "DOMAIN_BUSINESS",
  };

  const response = await axiosSocialInstance.get(
    "/biz/searchTimelineByMetadata",
    {
      params: {
        metaQuery: JSON.stringify(metaQuery),
        postIds: id,
      },
    }
  );

  if (response.data.hasError) {
    return handleSocialStatusError(response.data);
  }

  if (!response.data.result.length) {
    throw new NotFoundError(["Post not found"]);
  }
  const customPost = response.data.result[0]?.item;
  const { metadata } = customPost;
  return {
    ...JSON.parse(metadata),
    id: customPost.id,
    entityId: customPost.entityId,
    data: customPost.data ?? "0",
  };
};

export const updateCustomPostByEntityId = async (
  metadata: {
    domain: string;
    clientId: string;
    type: string;
    clientSecret: string;
    cryptoInitVectorKey: string;
    cryptoSecretKey: string;
  },
  entityId: number,
  content: string
) => {
  const response = await axiosSocialInstance.post("/biz/updateCustomPost", {
    metadata: JSON.stringify({
      ...metadata,
      CUSTOM_POST_TYPE: "DOMAIN_BUSINESS",
    }),
    entityId,
    content,
  });
  if (response.data.hasError) {
    return handleSocialStatusError(response.data);
  }
};
