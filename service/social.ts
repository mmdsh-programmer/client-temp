import {
  AuthorizationError,
  InputError,
  NotFoundError,
  ServerError,
} from "@utils/error";
import {
  ICustomPostMetadata,
  IMetaQuery,
  IPostInfo,
  ISocialError,
  ISocialProfile,
  ISocialResponse,
} from "@interface/app.interface";
import axios, { AxiosError } from "axios";
import qs from "qs";
import crypto from "crypto";
import { IQAList, IQAResponse } from "@interface/qa.interface";
import { IComment } from "@interface/version.interface";
import { getRedisClient } from "cacheHandler.mjs";

const { API_TOKEN, NEXT_PUBLIC_CORE_API } = process.env;

const axiosSocialInstance = axios.create({
  baseURL: NEXT_PUBLIC_CORE_API,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    _token_: API_TOKEN,
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
  console.log(log);
  // Logger.info(log);
  return request;
});

axiosSocialInstance.interceptors.response.use((response) => {
  const { data, status } = response;

  const log = JSON.stringify({
    data,
    status,
  });

  console.log(log);
  // Logger.info(log);
  return response;
});

export const handleSocialStatusError = (
  error: AxiosError<ISocialError> | ISocialResponse<unknown>
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
  domain: string | null,
  metaQuery: IMetaQuery,
  size: string,
  offset: string
) => {
  const redisClient = await getRedisClient();
  const cacheKey = `getCustomPost-${domain}`;

  const cachedData = await redisClient?.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

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

  await redisClient?.set(cacheKey, JSON.stringify(response.data));
  return response.data;
};

export const getCustomPostByDomain = async (
  domain: string
): Promise<ICustomPostMetadata> => {
  const redisClient = await getRedisClient();
  const cachedData = await redisClient?.get(`domain-${domain}`);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

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

  if (!response.data.result.length) {
    throw new NotFoundError(["این دامنه در سیستم ثبت نشده است."]);
  }
  const customPost = response.data.result[0]?.item;
  const { metadata } = customPost;
  const domainInfo = {
    ...JSON.parse(metadata),
    id: customPost.entityId,
    data: customPost.data ?? "0",
  };

  redisClient?.set(`domain-${domain}`, JSON.stringify(domainInfo));

  return domainInfo;
};

export const getCustomPostById = async (
  domain: string,
  id: number
): Promise<ICustomPostMetadata> => {
  const redisClient = await getRedisClient();
  const cacheKey = `getCustomPostById-${domain}`;

  const cachedData = await redisClient?.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

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

  const customPostData = {
    ...JSON.parse(metadata),
    id: customPost.id,
    entityId: customPost.entityId,
    data: customPost.data ?? "0",
  };

  await redisClient?.set(cacheKey, JSON.stringify(customPostData));
  return customPostData;
};

export const updateCustomPostByEntityId = async (
  metadata: {
    domain: string;
    clientId: string;
    type: string;
    clientSecret: string;
    cryptoInitVectorKey: string;
    cryptoSecretKey: string;
    enablePublishPage: boolean;
  },
  entityId: number,
  content: string
) => {
  const redisClient = await getRedisClient();
  const cachedData = await redisClient?.get(`domain-${metadata.domain}`);

  if (cachedData) {
    await redisClient?.del(`domain-${metadata.domain}`);
  }

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

export const likePost = async (
  accessToken: string,
  postId: number,
  like?: boolean,
  dislike?: boolean
) => {
  const mainUrl = typeof like === "boolean" ? "like" : "dislikePost";
  let url = `/${mainUrl}?postId=${postId}`;
  if (typeof like === "boolean") {
    url += `&dislike=${!like}`;
  } else if (typeof dislike === "boolean") {
    url += `&dislike=${dislike}`;
  }

  const response = await axiosSocialInstance.get<ISocialResponse<boolean>>(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        _token_: accessToken,
        _token_issuer_: 1,
      },
    }
  );
  if (response.data.hasError) {
    return handleSocialStatusError(response.data);
  }

  return response.data.result;
};

export const getPostInfo = async (accessToken: string, postId: number) => {
  const response = await axiosSocialInstance.get<ISocialResponse<IPostInfo[]>>(
    "getUserPostInfos",
    {
      headers: {
        "Content-Type": "application/json",
        _token_: accessToken,
        _token_issuer_: 1,
      },
      params: {
        postId,
      },
    }
  );
  if (response.data.hasError) {
    return handleSocialStatusError(response.data);
  }

  return response.data.result;
};

export const getQuestionAnswer = async (
  accessToken: string,
  offset: number,
  size: number,
  parentPostId?: number,
  id?: number[],
  uniqueId?: number[],
  userId?: number,
  firstId?: number,
  lastId?: number,
  fromDate?: number,
  toDate?: number,
  tags?: string[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tagTrees?: any,
  tagTreeCategoryName?: string[],
  mentionedUserList?: string[],
  activityInfo?: string,
  q?: string,
  relatedToIssuerClient?: string
) => {
  const response = await axiosSocialInstance.get<ISocialResponse<IQAList[]>>(
    "/userPostList",
    {
      headers: {
        "Content-Type": "application/json",
        _token_: accessToken,
      },
      params: {
        offset,
        size,
        parentPostId,
        id,
        uniqueId,
        userId,
        firstId,
        lastId,
        fromDate,
        toDate,
        tags,
        tagTrees,
        tagTreeCategoryName,
        mentionedUserList,
        activityInfo,
        q,
        relatedToIssuerClient,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    }
  );

  if (response.data.hasError) {
    return handleSocialStatusError(response.data);
  }

  return response.data;
};

export const createQuestionAnswer = async (
  accessToken: string,
  name: string,
  content: string,
  repliedPostId?: number,
  metadata?: string,
  replyPostConfirmation?: boolean,
  lgContent?: string,
  lat?: number,
  lng?: number,
  tags?: string[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tagTrees?: any,
  tagTreeCategoryName?: string[],
  mentionedUserList?: string[],
  canComment: boolean = true,
  canLike: boolean = true,
  canRate: boolean = true,
  enable: boolean = true
) => {
  const response = await axiosSocialInstance.get<ISocialResponse<IQAResponse>>(
    "/addUserPost",
    {
      headers: {
        "Content-Type": "application/json",
        _token_: accessToken,
      },
      params: {
        name,
        content,
        canComment,
        canLike,
        canRate,
        enable,
        replyPostConfirmation: false,
        metadata,
        lgContent,
        repliedPostId,
        lat,
        lng,
        tags,
        tagTrees,
        tagTreeCategoryName,
        mentionedUserList,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    }
  );
  if (response.data.hasError) {
    return handleSocialStatusError(response.data);
  }

  return response.data;
};

export const updateQuestionAnswer = async (
  accessToken: string,
  entityId: number,
  name: string,
  content: string,
  repliedPostId?: number,
  metadata?: string,
  canComment?: boolean,
  canLike?: boolean,
  enable?: boolean,
  canRate?: boolean,
  replyPostConfirmation?: boolean,
  lgContent?: string,
  lat?: number,
  lng?: number,
  tags?: string[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tagTrees?: any,
  tagTreeCategoryName?: string[],
  mentionedUserList?: string[]
) => {
  const response = await axiosSocialInstance.get<ISocialResponse<IQAResponse>>(
    "/updateUserPost",
    {
      headers: {
        "Content-Type": "application/json",
        _token_: accessToken,
      },
      params: {
        name,
        entityId,
        content,
        canComment,
        canLike,
        canRate,
        enable,
        replyPostConfirmation,
        metadata,
        lgContent,
        repliedPostId,
        lat,
        lng,
        tags,
        tagTrees,
        tagTreeCategoryName,
        mentionedUserList,
      },
    }
  );

  if (response.data.hasError) {
    return handleSocialStatusError(response.data);
  }

  return response.data;
};

export const archivePost = async (accessToken: string, postIds: number[]) => {
  const response = await axiosSocialInstance.get<ISocialResponse<boolean>>(
    "/archivePost",
    {
      headers: {
        "Content-Type": "application/json",
        _token_: accessToken,
      },
      params: {
        postIds,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    }
  );

  if (response.data.hasError) {
    return handleSocialStatusError(response.data);
  }

  return response.data;
};

export const createComment = async (
  accessToken: string,
  text: string,
  postId: number
) => {
  const response = await axiosSocialInstance.get<ISocialResponse<number>>(
    "/comment",
    {
      headers: {
        "Content-Type": "application/json",
        _token_: accessToken,
      },
      params: {
        text,
        postId,
      },
    }
  );

  if (response.data.hasError) {
    return handleSocialStatusError(response.data);
  }
  return response.data;
};

export const confirmComment = async (commentId: number) => {
  const response = await axiosSocialInstance.get<ISocialResponse<number>>(
    "/biz/confirmComment",
    {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        commentId,
      },
    }
  );

  if (response.data.hasError) {
    return handleSocialStatusError(response.data);
  }
  return response.data;
};

export const getPublishCommentList = async (
  accessToken: string,
  postId: number,
  offset: number,
  size: number
) => {
  const response = await axiosSocialInstance.get<ISocialResponse<IComment[]>>(
    "/commentList",
    {
      headers: {
        "Content-Type": "application/json",
        _token_: accessToken,
        _token_issuer_: 1,
      },
      params: {
        postId,
        offset,
        size,
      },
    }
  );
  if (response.data.hasError) {
    return handleSocialStatusError(response.data);
  }
  return response.data;
};

export const likeComment = async (
  accessToken: string,
  commentId: number,
  dislike: boolean
) => {
  const response = await axiosSocialInstance.get<ISocialResponse<boolean>>(
    "/likeComment",
    {
      headers: {
        "Content-Type": "application/json",
        _token_: accessToken,
      },
      params: {
        commentId,
        dislike,
      },
    }
  );
  if (response.data.hasError) {
    return handleSocialStatusError(response.data);
  }

  return response.data;
};

export const dislikeComment = async (
  accessToken: string,
  commentId: number,
  dislike: boolean
) => {
  const response = await axiosSocialInstance.get<ISocialResponse<boolean>>(
    "/dislikeComment",
    {
      headers: {
        "Content-Type": "application/json",
        _token_: accessToken,
      },
      params: {
        commentId,
        dislike,
      },
    }
  );
  if (response.data.hasError) {
    return handleSocialStatusError(response.data);
  }

  return response.data;
};

export const getMySocialProfile = async (accessToken: string) => {
  const redisClient = await getRedisClient();
  const socialProfileKeys = await redisClient?.keys("socialProfile:*");

  const cachedData = await redisClient?.get(`socialProfile:${accessToken}`);

  if (socialProfileKeys) {
    socialProfileKeys.map((key) => {
      return key !== `socialProfile:${accessToken}` && redisClient?.del(key);
    });
  }

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const response = await axiosSocialInstance.get<
    ISocialResponse<ISocialProfile>
  >("/mySocialProfile", {
    headers: {
      "Content-Type": "application/json",
      _token_: accessToken,
    },
  });
  if (response.data.hasError) {
    return handleSocialStatusError(response.data);
  }

  await redisClient?.set(
    `socialProfile:${accessToken}`,
    JSON.stringify(response.data)
  );
  return response.data;
};

export const editSocialProfile = async (
  accessToken: string,
  isPrivate: boolean
) => {
  const redisClient = await getRedisClient();
  const cachedData = await redisClient?.keys("socialProfile:*");

  if (cachedData) {
    cachedData?.map((key) => {
      return redisClient?.del(key);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await axiosSocialInstance.get<ISocialResponse<any>>(
    "/editSocialProfile",
    {
      headers: {
        "Content-Type": "application/json",
        _token_: accessToken,
        _token_issuer_: 1,
      },
      params: {
        private: isPrivate,
      },
    }
  );

  if (response.data.hasError) {
    return handleSocialStatusError(response.data);
  }
  await redisClient?.set(
    `socialProfile:${accessToken}`,
    JSON.stringify(response.data)
  );
  return response.data;
};
