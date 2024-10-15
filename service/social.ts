import { AuthorizationError, InputError, NotFoundError, ServerError } from "@utils/error";
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
    "/biz/searchTimelineByMetadata", {
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

export const getCustomPostByDomain = async (domain: string): Promise<ICustomPostMetadata> => {
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
  
  
  const response = await axiosSocialInstance.get(
    "/biz/searchTimelineByMetadata", {
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

  if(!response.data.result.length){
    throw new NotFoundError(["Domain not found"]);
  }
  const customPost = response.data.result[0]?.item;
  const { metadata } = customPost;
  return { ...JSON.parse(metadata), id: customPost.entityId, content: customPost.content ?? "0" };
};

export const getCustomPostById = async (id: number): Promise<ICustomPostMetadata> => {
  const metaQuery: IMetaQuery = {
    field: "CUSTOM_POST_TYPE",
    is: "DOMAIN_BUSINESS"
  };
  
  const response = await axiosSocialInstance.get(
    "/biz/searchTimelineByMetadata", {
      params: {
        metaQuery: JSON.stringify(metaQuery),
        postIds: id
      },
    }
  );
  
  if (response.data.hasError) {
    return handleSocialStatusError(response.data);
  }

  if(!response.data.result.length){
    throw new NotFoundError(["Post not found"]);
  }
  const customPost = response.data.result[0]?.item;
  const { metadata } = customPost;
  return { ...JSON.parse(metadata), id: customPost.id, entityId: customPost.entityId, content: customPost.content ?? "0" };
};


export const updateCustomPostByEntityId = async (metadata: {
  domain: string,
  clientId: string,
  type: string,
  clientSecret: string
}, entityId: number, content: string) => {
  
  const response = await axiosSocialInstance.get(
    "/biz/updateCustomPost", {
      params: {
        metadata: JSON.stringify({
          ...metadata,
          "CUSTOM_POST_TYPE": "DOMAIN_BUSINESS"
        }),
        entityId,
        content
      },
    }
  );
  
  if (response.data.hasError) {
    return handleSocialStatusError(response.data);
  }
  
};