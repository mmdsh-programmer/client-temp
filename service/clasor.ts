/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  AuthorizationError,
  DuplicateError,
  ForbiddenError,
  IOriginalError,
  InputError,
  NotFoundError,
  ServerError,
  UnprocessableError,
} from "@utils/error";
import {
  IAccessRequest,
  IAccessRequestResponse,
} from "@interface/accessRequest.interface";
import {
  IAddVersion,
  IComment,
  IFileVersion,
  ILikeList,
  IVersion,
} from "@interface/version.interface";
import { IBranchList, IBranchUserList } from "@interface/branch.interface";
import { ICategory, ICategoryMetadata } from "@interface/category.interface";
import {
  IChildrenFilter,
  IClasorError,
  IDomainMetadata,
  IGetToken,
  IMyInfo,
  IReportFilter,
  IServerResult,
  IUserInfo,
} from "@interface/app.interface";
import {
  IClasorDomainResult,
  IClasorReport,
  IClasorResult,
} from "@interface/clasor";
import {
  IClasorField,
  IDocument,
  IDocumentMetadata,
  IWhiteList,
} from "@interface/document.interface";
import {
  IContentSearchListItem,
  IContentSearchResult,
} from "@interface/contentSearch.interface";
import {
  ICreateGroup,
  IGetGroup,
  IGetGroups,
  IUpdateGroup,
} from "@interface/group.interface";
import { IFile, IPodspaceResult } from "@interface/file.interface";
import {
  IListResponse,
  IPublicKey,
  IRepo,
  IRepoSubscriptionStatus,
  IReport,
} from "@interface/repo.interface";
import { IRoles, IUser } from "@interface/users.interface";
import axios, { AxiosError, isAxiosError } from "axios";

import { EDocumentTypes } from "@interface/enums";
import { IBLockDocument } from "@interface/editor.interface";
import { IDomainSubscriptionList } from "@interface/domain.interface";
import { IFeedItem } from "@interface/feeds.interface";
import { IGetUserAccesses } from "@interface/access.interface";
import { IOfferResponse } from "@interface/offer.interface";
import { IPositionList } from "@interface/position.interface";
import { ISortProps } from "@atom/sortParam";
import { ITag } from "@interface/tags.interface";
import Logger from "@utils/logger";
import { decryptKey } from "@utils/crypto";
import { getRedisClient } from "@utils/redis";
import qs from "qs";

const axiosClasorInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClasorInstance.interceptors.request.use((request) => {
  const { headers, baseURL, method, url, data } = request;
  const log = {
    type: "REQUEST",
    headers,
    baseURL,
    method,
    url,
    data,
  };

  Logger.info(JSON.stringify(log));
  return request;
}, (error) => {
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
  Logger.error(JSON.stringify(log));
  return Promise.reject(error);
});

axiosClasorInstance.interceptors.response.use(
  (response) => {
    const { data, status } = response;
    const log = {
      type: "RESPONSE",
      data,
      status,
    };
    Logger.info(JSON.stringify(log));
    return response;
  },
  (error) => {
    const { headers } = error.config;
    const log = {
      type: "RESPONSE_ERROR",
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data,
      },
      response: {
        status: error.response?.status,
        data: error.response?.data,
      },
      headers: {
        Accept: headers?.Accept,
        "Accept-Encoding": headers?.["Accept-Encoding"],
        Authorization: headers?.Authorization,
      },
    };
    Logger.error(JSON.stringify(log));
    return Promise.reject(error);
  }
);

export const handleClasorStatusError = (error: AxiosError<IClasorError>) => {
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
      case 409:
        throw new DuplicateError(message, error as IOriginalError);
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

export const getToken = async (code: string, redirectUrl: string) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<IGetToken>>(
      "auth/login",
      { code, redirectUrl }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const userInfo = async (accessToken: string, domainUrl: string, expiresAt: number) => {
  const redisClient = await getRedisClient();
  const cachedUser = await redisClient?.get(`user:${accessToken}`);
  if (cachedUser) {
    Logger.warn(
      JSON.stringify({
        type: "Redis cache data",
        data: cachedUser,
      })
    );
    return JSON.parse(cachedUser);
  }
  try {
    const response = await axiosClasorInstance.get<IServerResult<IUserInfo>>(
      "auth/getMe",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          domainUrl,
        },
      }
    );
    await redisClient?.set(`user:${accessToken}`, JSON.stringify(response.data.data), {
      EX: expiresAt,
    });
    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const logout = async (access_token: string, refresh_token: string) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<IGetToken>>(
      "auth/logout",
      {
        refreshToken: refresh_token,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const userMetadata = async (access_token: string, data: object) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      "auth/setUserMetadata",
      {
        metadata: data,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// /////////////////////// INFO /////////////////////////
export const getMyInfo = async (access_token: string, repoTypes?: string[]) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IMyInfo>>(
      "myInfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          repoTypes,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, {
            indexes: false,
          });
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// ////////////////////// REPORT //////////////////////
export const getReport = async (accessToken: string, repoId: number) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IReport>>(
      `repositories/${repoId}/report`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// /////////////////// REPOSITORY /////////////////////////
export const getAllRepositories = async (
  accessToken: string,
  offset: number,
  size: number,
  name?: string,
  repoTypes?: string[]
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IRepo>>
    >("repositories", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        offset,
        size,
        title: name,
        repoTypes,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, {
          indexes: false,
        });
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getPublishRepositoryInfo = async (repoId: number) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IRepo>>(
      `repositories/${repoId}/publish`
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getRepositoryKeys = async (
  accessToken: string,
  repoId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IPublicKey>>
    >(`repositories/${repoId}/publicKey`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        offset,
        size,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteRepositoryKey = async (
  accessToken: string,
  repoId: number,
  keyId: number
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}/publicKey/${keyId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createRepositoryKey = async (
  accessToken: string,
  repoId: number,
  name: string,
  key: string
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `repositories/${repoId}/publicKey`,
      {
        name,
        key,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getKey = async (
  accessToken: string,
  repoId: number,
  keyId: number,
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IPublicKey>>(
      `repositories/${repoId}/publicKey/${keyId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          isDirectAccess,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getMyRepositories = async (
  accessToken: string,
  offset: number,
  size: number,
  archived: boolean,
  name?: string,
  isPublish?: boolean,
  repoTypes?: string[]
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IRepo>>
    >("repositories/myRepoList", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        offset,
        size,
        archived,
        title: name,
        isPublish,
        repoTypes,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, {
          indexes: false,
        });
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getRepository = async (
  accessToken: string,
  repoId: number | null
) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IRepo>>(
      `repositories/${repoId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getAccessRepositories = async (
  accessToken: string,
  offset: number,
  size: number,
  name?: string,
  repoTypes?: string[]
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IRepo>>
    >("repositories/myAccessRepoList", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        offset,
        size,
        title: name,
        repoTypes,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, {
          indexes: false,
        });
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getBookmarkRepositories = async (
  accessToken: string,
  offset: number,
  size: number,
  name?: string,
  repoTypes?: string[]
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IRepo>>
    >("repositories/myBookmarkList", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        offset,
        size,
        title: name,
        repoTypes,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, {
          indexes: false,
        });
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const editRepo = async (
  accessToken: string,
  repoId: number,
  name: string,
  description: string
) => {
  try {
    const response = await axiosClasorInstance.put<IServerResult<any>>(
      `repositories/${repoId}`,
      {
        name,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteRepository = async (accessToken: string, repoId: number) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          forceDelete: true,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const archiveRepository = async (
  accessToken: string,
  repoId: number
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `repositories/${repoId}/archive`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const restoreRepository = async (
  accessToken: string,
  repoId: number
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `repositories/${repoId}/restore`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createRepo = async (
  accessToken: string,
  name: string,
  repoTypes: string[],
  description?: string
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      "repositories",
      {
        name,
        description,
        repoTypes,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const leaveRepository = async (accessToken: string, repoId: number) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}/leftRepo`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const bookmarkRepository = async (
  accessToken: string,
  repoId: number,
  detach?: boolean
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `repositories/${repoId}/bookmark`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          detach,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const imageRepository = async (
  accessToken: string,
  repoId: number,
  fileHash: string | null
) => {
  try {
    const response = await axiosClasorInstance.put<IServerResult<any>>(
      `repositories/${repoId}/image`,
      {
        fileHash,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const transferOwnershipRepository = async (
  accessToken: string,
  repoId: number,
  userName: string
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `repositories/${repoId}/owner/${userName}`,
      { userName },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const subscribeToRepository = async (
  accessToken: string,
  repoId: number,
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.post(
      `repositories/${repoId}/subscription`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          isDirectAccess,
        },
      }
    );

    return response.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getRepositorySubscription = async (
  accessToken: string,
  repoId: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IRepoSubscriptionStatus>
    >(`repositories/${repoId}/subscription/userStatus`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// /////////////////////// USERS ///////////////////////
export const getRepositoryUsers = async (
  accessToken: string,
  repoId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IUser>>
    >(`repositories/${repoId}/acl/getRepoUsers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        offset,
        size,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getRepositoryInviteRequestsByOwner = async (
  accessToken: string,
  repoId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IAccessRequest>>
    >(`repositories/${repoId}/userAccessRequest`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        offset,
        size,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getRoles = async (accessToken: string) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IRoles[]>>(
      "admin/getRoles",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const addUserToRepo = async (
  accessToken: string,
  repoId: number,
  username: string,
  accessName: string
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `repositories/${repoId}/userAccessRequest`,
      {
        username,
        accessName,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const editUserRole = async (
  accessToken: string,
  repoId: number,
  userName: string,
  roleName: string
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `repositories/${repoId}/acl`,
      { userName, roleName },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteUser = async (
  accessToken: string,
  repoId: number,
  userName: string
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}/acl`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          userName,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteInviteRequest = async (
  accessToken: string,
  repoId: number,
  userId: number
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}/userAccessRequest/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// ////////////////////////// GROUPS ///////////////////////
export const getRepositoryGroups = async (
  accessToken: string,
  repoId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IGetGroups>>
    >(`repositories/${repoId}/groups/getRepoGroups`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        offset,
        size,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getGroupInfo = async (
  accessToken: string,
  repoId: number,
  title: string
) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IGetGroup>>(
      `repositories/${repoId}/groups/${title}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createGroup = async (
  accessToken: string,
  repoId: number,
  title: string,
  description?: string,
  members?: string[]
) => {
  try {
    const response = await axiosClasorInstance.post<
      IServerResult<ICreateGroup>
    >(
      `repositories/${repoId}/groups`,
      { title, description, members, memberType: "username" },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const updateGroup = async (
  accessToken: string,
  repoId: number,
  title: string,
  description?: string,
  newTitle?: string,
  members?: string[]
) => {
  try {
    const response = await axiosClasorInstance.patch<
      IServerResult<IUpdateGroup>
    >(
      `repositories/${repoId}/groups/${title}`,
      { title: newTitle, description, members, memberType: "username" },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteGroup = async (
  accessToken: string,
  repoId: number,
  title: string
) => {
  try {
    const response = await axiosClasorInstance.delete<
      IServerResult<IUpdateGroup>
    >(`repositories/${repoId}/groups/${title}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// //////////////////////// TAGS /////////////////////
export const getRepositoryTags = async (
  accessToken: string,
  repoId: number,
  offset: number,
  size: number,
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<ITag>>
    >(`repositories/${repoId}/tags`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        offset,
        size,
        isDirectAccess,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createTag = async (
  accessToken: string,
  repoId: number,
  name: string,
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `repositories/${repoId}/tags`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          isDirectAccess,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const editTag = async (
  accessToken: string,
  repoId: number,
  tagId: number,
  name: string,
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.put<IServerResult<any>>(
      `repositories/${repoId}/tags/${tagId}`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          isDirectAccess,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteTag = async (
  accessToken: string,
  repoId: number,
  idTag: number,
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}/tags/${idTag}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          isDirectAccess,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// /////////////////// CATEGORY ////////////////////////
export const getChildren = async (
  accessToken: string,
  repoId: number,
  categoryId: number | undefined | null,
  sortParams: ISortProps,
  offset: number,
  size: number,
  title?: string | null,
  type?: "category" | "document",
  filters?: IChildrenFilter | null
) => {
  let finalType = type;

  if (filters?.type.category && filters.type.document) {
    finalType = type;
  } else if (filters?.type.category && !filters.type.document) {
    finalType = "category";
  } else if (!filters?.type.category && filters?.type.document) {
    finalType = "document";
  }

  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<ICategoryMetadata | IDocumentMetadata>>
    >(
      `repositories/${repoId}/categories/getChildren?${[
        {
          field: "type",
          order: sortParams.type,
        },
        {
          field: "order",
          order: sortParams.order,
        },
        {
          field: "createdAt",
          order: sortParams.createdAt,
        },
        {
          field: "name",
          order: sortParams.name,
        },
      ]
        .map((n) => {
          return `sortParams=${encodeURIComponent(JSON.stringify(n))}`;
        })
        .join("&")}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          parentId: categoryId,
          offset,
          size,
          title: title?.length ? title : undefined,
          type: finalType,
          contentTypes: filters?.contentTypes,
          tagIds: filters?.tagIds,
          bookmarked: filters?.bookmarked,
          isTemplate: filters?.isTemplate,
          withTemplate: !filters?.isTemplate,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, {
            indexes: false,
          });
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getCategory = async (
  accessToken: string,
  repoId: number,
  categoryId: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<ICategoryMetadata>
    >(`repositories/${repoId}/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createCategory = async (
  accessToken: string,
  repoId: number,
  parentId: number | null,
  name: string,
  description: string,
  order?: number | null
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<ICategory>>(
      `repositories/${repoId}/categories`,
      {
        parentId,
        name,
        description,
        order: order === null ? order : order,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const editCategory = async (
  accessToken: string,
  repoId: number,
  categoryId: number | null,
  parentId: number | null,
  name: string,
  description: string | undefined,
  order: number | null,
  isHidden: boolean
) => {
  try {
    const response = await axiosClasorInstance.put<IServerResult<ICategory>>(
      `repositories/${repoId}/categories/${categoryId}`,
      { 
        name, 
        description, 
        order: order === null ? order : order, 
        isHidden, parentId 
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteCategory = async (
  accessToken: string,
  repoId: number,
  categoryId: number,
  forceDelete: boolean
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<ICategory>>(
      `repositories/${repoId}/categories/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          forceDelete,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getCategoryBlocklist = async (
  accessToken: string,
  repoId: number,
  categoryId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<any>>(
      `repositories/${repoId}/categories/${categoryId}/blocklist`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          offset,
          size,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const addUserToCategoryBlocklist = async (
  accessToken: string,
  repoId: number,
  categoryId: number,
  username: string,
  type: "block" | "unblock"
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<ICategory>>(
      `repositories/${repoId}/categories/${categoryId}/${type}/username/${username}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// ///////////////////// CONTENT ///////////////////////
export const getContent = async (
  accessToken: string,
  repoId: number,
  searchParam: string,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IContentSearchResult>
    >(
      `publicContent/repository/${repoId}/search/${encodeURIComponent(searchParam)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          offset,
          size,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// /////////////////////////// REPORT ////////////////////
export const getUserDocument = async (
  accessToken: string,
  repoId: number | undefined,
  sortParams: ISortProps,
  offset: number,
  size: number,
  filters: IReportFilter | null | undefined,
  reportType: "myDocuments" | "myAccessDocuments" | null,
  repoTypes: string[]
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IDocumentMetadata>>
    >(
      `report/myDocument?${[
        {
          field: "type",
          order: sortParams.type,
        },
        {
          field: "order",
          order: sortParams.order,
        },
        {
          field: "createdAt",
          order: sortParams.createdAt,
        },
        {
          field: "name",
          order: sortParams.name,
        },
      ]
        .map((n) => {
          return `sortParams=${encodeURIComponent(JSON.stringify(n))}`;
        })
        .join("&")}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          offset,
          size,
          repoId,
          repoTypes,
          reportType,
          title: filters?.title,
          contentTypes: filters?.contentTypes,
          tagIds: filters?.tagIds,
          slug: filters?.slug,
          bookmarked: filters?.bookmarked,
          isTemplate: filters?.isTemplate,
          withTemplate: !filters?.isTemplate,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, {
            indexes: false,
          });
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// //////////////////// BULK ////////////////////
export const moveBulk = async (
  accessToken: string,
  repoId: number,
  parentId: number | null,
  children: number[]
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `repositories/${repoId}/categories/moveChildren`,
      {
        parentId,
        children,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteBulk = async (
  accessToken: string,
  repoId: number,
  children: number[],
  forceDelete?: boolean
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}/categories/deleteChildren`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          forceDelete,
        },
        data: { children },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// ////////////////////// DOCUMENT ///////////////////////
export const getDocument = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  isDirectAccess?: boolean,
  offset?: number,
  size?: number,
  disableVersions?: boolean
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IDocumentMetadata>
    >(
      `repositories/${repoId}/documents/${documentId}/info?type=document&disableVersions=${disableVersions}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          offset,
          size,
          isDirectAccess,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getPublishDocumentVersion = async (
  repoId: number,
  documentId: number,
  versionId: number,
  password?: string,
  accessToken?: string
) => {
  const headers = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : undefined;

  try {
    const response = await axiosClasorInstance.get<IServerResult<IVersion>>(
      `repositories/${repoId}/publish/document/${documentId}/versions/${versionId}?innerDocument=true&innerOutline=true`,
      {
        headers,
        params: {
          password,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getPublishDocumentLastVersion = async (
  repoId: number,
  documentId: number,
  password?: string,
  accessToken?: string
) => {
  const headers = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : undefined;

  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IVersion | null>
    >(`repositories/${repoId}/publish/document/${documentId}/lastVersion`, {
      headers,
      params: {
        password,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getPublishDocumentVersions = async (
  repoId: number,
  documentId: number,
  offset: number,
  size: number,
  ssoId?: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IVersion>>
    >(`repositories/${repoId}/publish/document/${documentId}/versions`, {
      params: {
        offset,
        size,
        userssoid: ssoId,
      },
    });
    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getPublishDocumentInfo = async (
  repoId: number,
  documentId: number,
  disableVersions?: boolean
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IDocumentMetadata>
    >(`repositories/${repoId}/publish/document/${documentId}`, {
      params: {
        disableVersions,
      },
    });
    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const searchPublishContent = async (
  repoId: number,
  searchText: string,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IContentSearchListItem>>
    >(
      `publicContent/repository/${repoId}/search/${encodeURIComponent(searchText)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
        params: {
          offset,
          size,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getClasorField = async (accessToken: string) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IClasorField[]>
    >("clasorFields", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createDocument = async (
  accessToken: string,
  repoId: number,
  categoryId: number | null,
  title: string,
  contentType: EDocumentTypes,
  isTemplate: boolean,
  description?: string,
  order?: number | null,
  imageUrl?: string,
  publicKeyId?: string
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<IDocument>>(
      `repositories/${repoId}/documents`,
      {
        title,
        contentType,
        categoryId,
        description,
        imageUrl,
        order: order === null ? order : order,
        isTemplate,
        publicKeyId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createDocumentTemplate = async (
  accessToken: string,
  repoId: number,
  categoryId: number | null,
  title: string,
  contentType: EDocumentTypes,
  versionNumber: string,
  templateId: number,
  description?: string,
  order?: number,
  imageUrl?: string
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<IDocument>>(
      `repositories/${repoId}/documents/withDraft/${versionNumber}/template/${templateId}`,
      {
        title,
        contentType,
        categoryId,
        description,
        imageUrl,
        order,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const editDocument = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  categoryId: number | null,
  title: string,
  contentType: EDocumentTypes,
  description?: string,
  order?: number | null,
  isHidden?: boolean,
  tagIds?: number[],
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.put<IServerResult<IDocument>>(
      `repositories/${repoId}/documents/${documentId}`,
      { 
        categoryId, 
        title, 
        contentType, 
        order: order === null ? order : order, 
        description, 
        isHidden, 
        tagIds 
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          isDirectAccess,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteDocument = async (
  accessToken: string,
  repoId: number,
  documentId: number
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<IDocument>>(
      `repositories/${repoId}/documents/${documentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const bookmarkDocument = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  detach?: boolean
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/bookmark`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          detach,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getDocumentBlocklist = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/blocklist`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          offset,
          size,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const addUserToDocumentBlocklist = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  username: string,
  type: "block" | "unblock"
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<ICategory>>(
      `repositories/${repoId}/documents/${documentId}/${type}/username/${username}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getDocumentWhiteBlackList = async (
  accessToken: string,
  repoId: number,
  documentId: number
) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IWhiteList>>(
      `repositories/${repoId}/documents/${documentId}/getUserList`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const addToDocumentBlackList = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  usernameList: string[]
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/blacklist`,
      { usernameList },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const addToDocumentWhiteList = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  usernameList: string[]
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/whitelist`,
      { usernameList },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createDocumentPassword = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  password: string
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/password`,
      {
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const updateDocumentPassword = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  oldPassword: string | undefined,
  newPassword: string
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/password`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteDocumentPassword = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  oldPassword: string
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<IDocument>>(
      `repositories/${repoId}/documents/${documentId}/password`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          oldPassword,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const documentEnableUserGroupHash = async (
  access_token: string,
  repoId: number,
  documentId: number,
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/enableUserGroup`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          isDirectAccess,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// ////////////////// VERSION //////////////////
export const getVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionId: number | undefined,
  state?: "draft" | "version" | "public",
  innerDocument?: boolean,
  innerOutline?: boolean,
  isDirectAccess?: boolean
) => {
  try {
    let versionPath = "";
    if (state === "draft") {
      versionPath = "/draft";
    } else if (state === "public") {
      versionPath = "/publicVersion";
    }
    const response = await axiosClasorInstance.get<IServerResult<IVersion>>(
      `repositories/${repoId}/documents/${documentId}/versions/${versionId}${versionPath}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          innerDocument,
          innerOutline,
          isDirectAccess,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionNumber: string,
  content: string,
  outline: string,
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<IAddVersion>>(
      `repositories/${repoId}/documents/${documentId}/versions`,
      { versionNumber, content, outline },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          isDirectAccess,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createFileVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionNumber: string,
  fileHash?: IFileVersion,
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/versions`,
      { versionNumber, fileHash },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          isDirectAccess,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionId: number,
  state: string,
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/versions/${versionId}${
        state === "draft" ? "/draft" : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          isDirectAccess,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getLastVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IVersion>>(
      `repositories/${repoId}/documents/${documentId}/lastVersion`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          isDirectAccess,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const setLastVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionId: number,
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<IVersion>>(
      `repositories/${repoId}/documents/${documentId}/lastVersion`,
      { versionId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          isDirectAccess,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const publicVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionId: number,
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/versions/${versionId}/publicVersion`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          isDirectAccess,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const cancelPublicVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionId: number,
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/versions/${versionId}/privateVersion`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          isDirectAccess,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const confirmVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionId: number,
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<IVersion>>(
      `repositories/${repoId}/documents/${documentId}/versions/${versionId}/publishDraft`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          isDirectAccess,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const cancelConfirmVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionId: number,
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/versions/${versionId}/status`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          isDirectAccess,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};
export const getResourceFiles = async (
  accessToken: string,
  resourceId: number,
  userGroupHash: string,
  offset: number,
  size: number,
  name?: string,
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<
        IPodspaceResult<{
          list: IFile[];
          count: number;
        }>
      >
    >(`/fileManagement/resource/${resourceId}/userGroup/${userGroupHash}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        offset,
        size,
        name,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};
export const editFile = async (
  accessToken: string,
  resourceId: number,
  newName: string,
  hash: string
) => {
  try {
    const response = await axiosClasorInstance.patch(
      `/fileManagement/resource/${resourceId}/rename/file/${hash}/newName/${newName}`,
      {
        newName,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteFile = async (
  accessToken: string,
  repoId: number,
  resourceId: number,
  fileHash: string,
  type: "private" | "public"
) => {
  try {
    const response = await axiosClasorInstance.delete(
      `repositories/${repoId}/files/resource/${resourceId}/fileHash/${fileHash}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          type,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createUploadLink = async (
  accessToken: string,
  resourceId: number,
  userGroupHash: string
) => {
  try {
    const response = await axiosClasorInstance.post(
      `fileManagement/resource/${resourceId}/uploadLink`,
      {
        expireTime: (Date.now() + 3600 * 1000).toString(),
        userGroupHash,
        isPublic: false,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// //////////////////////// RELEASE DOCS //////////////////////////
export const getPendingDrafts = async (
  accessToken: string,
  repoId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IVersion>>
    >(`repositories/${repoId}/getPendingDrafts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        offset,
        size,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getPendingVersion = async (
  accessToken: string,
  repoId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IVersion>>
    >(`admin/${repoId}/getRepoPendingVersion`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        offset,
        size,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const acceptDraft = async (
  accessToken: string,
  repoId: number,
  docId: number,
  draftId: number
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<IVersion>>(
      `repositories/${repoId}/documents/${docId}/versions/${draftId}/accept`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const acceptVersion = async (
  accessToken: string,
  repoId: number,
  versionId: number
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `admin/${repoId}/acceptVersion/${versionId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const rejectDraft = async (
  accessToken: string,
  repoId: number,
  docId: number,
  draftId: number
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `repositories/${repoId}/documents/${docId}/versions/${draftId}/reject`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const rejectVersion = async (
  accessToken: string,
  repoId: number,
  versionId: number
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `admin/${repoId}/rejectVersion/${versionId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// ////////////////////// PUBLIC LINK ///////////////////
export const createRepoPublicLink = async (
  accessToken: string,
  repoId: number,
  roleId: number,
  expireTime?: number,
  password?: string
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `repositories/${repoId}/publicLink`,
      {
        roleId,
        expireTime,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deletePublicLink = async (
  accessToken: string,
  repoId: number,
  roleId: number
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}/publicLink`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          roleId,
        },
      }
    );

    return response.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const subscribeRepo = async (
  accessToken: string,
  hash: string,
  password?: string
) => {
  try {
    const response = await axiosClasorInstance.put<
      IServerResult<{ repository: IRepo }>
    >(
      `repositories/subscribe/${hash}`,
      {
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};
/// //////////////////////// PUBLISH /////////////////////
export const createRepoPublishLink = async (
  accessToken: string,
  repoId: number,
  expireTime?: number,
  password?: string
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<void>>(
      `repositories/${repoId}/publish`,
      {
        expireTime,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deletePublishLink = async (
  accessToken: string,
  repoId: number
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}/publish`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// ///////////////////// REQUESTS ///////////////////
export const getUserToRepoRequests = async (
  accessToken: string,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IAccessRequestResponse>
    >("acl/userRequests", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        offset,
        size,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const acceptUserToRepoRequest = async (
  accessToken: string,
  requestId: number
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `acl/userRequest/${requestId}/accept`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          requestId,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const rejectUserToRepoRequest = async (
  accessToken: string,
  requestId: number
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `acl/userRequest/${requestId}/reject`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          requestId,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// ////////////////////// EDITOR //////////////////
export const saveVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionId: number,
  versionNumber: string,
  content: string,
  outline: string,
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.put<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/versions/${versionId}`,
      { content, outline, versionNumber },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        params: {
          isDirectAccess,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    return response.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const saveFileVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionId: number,
  versionNumber: string,
  fileHash: {
    hash: string;
    fileName: string;
    fileExtension: string;
  },
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.put<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/versions/${versionId}`,
      { fileHash, versionNumber },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          isDirectAccess,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const freeDraftVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionId: number,
  versionNumber: string,
  content: string,
  outline: string,
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.put<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/versions/${versionId}/freeDraft`,
      { versionNumber, content, outline },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          isDirectAccess,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createBlockVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionId: number,
  isDirectAccess?: boolean
) => {
  try {
    const response = await axiosClasorInstance.post<
      IServerResult<IBLockDocument>
    >(
      `repositories/${repoId}/documents/${documentId}/versions/${versionId}/block`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          isDirectAccess,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// ///////////////////////////// FEEDBACK ////////////////////////////////

export const sendFeedback = async (
  accessToken: string,
  content: string,
  fileHashList: { hash: string; fileName: string; fileExtension: string }[]
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      "feedback",
      { message: content, fileHash: fileHashList },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const addUserToFeedbackGroupHash = async (accessToken: string) => {
  try {
    const response = await axiosClasorInstance.post<
      IServerResult<{ isAddUser: boolean }>
    >(
      "feedback/addUser",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// ///////////////////////// ADMIN PANEL //////////////////////////////

export const getAdminPanelReport = async (accessToken: string) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IClasorReport>
    >("admin/clasorReport", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getAdminPanelFeedback = async (
  accessToken: string,
  top: number,
  skip: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IOfferResponse>
    >(`admin/feedback?top=${top}&skip=${skip}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        top,
        skip,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// /////////////////////////////// CORE //////////////////////
export const getCommentList = async (
  access_token: string,
  postId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IComment>>
    >(`core/content/${postId}/comment`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        offset,
        size,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteComment = async (
  access_token: string,
  commentId: number
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `core/comment/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createComment = async (
  access_token: string,
  postId: number,
  text: string
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `core/content/${postId}/comment`,
      { text },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getLike = async (
  access_token: string,
  postId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<ILikeList>>
    >(`core/content/${postId}/like`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        offset,
        size,
        hasUser: true,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getDislike = async (
  access_token: string,
  postId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<ILikeList>>
    >(`core/content/${postId}/dislike`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        offset,
        size,
        hasUser: true,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// /////////////////////////////// PUBLISH SERVICES //////////////////////

export const getPublishRepoList = async (
  offset: number,
  size: number,
  repoTypes: string[]
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IRepo>>
    >("repositories/publishRepoList", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        offset,
        size,
        repoTypes,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, {
          indexes: false,
        });
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getPublishChildren = async (
  repoId: number,
  offset: number,
  size: number,
  categoryId?: number,
  ssoId?: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<ICategoryMetadata | IDocumentMetadata>>
    >(
      `repositories/${repoId}/publish/getChildren?${[
        {
          field: "type",
          order: "asc",
        },
        {
          field: "order",
          order: "asc",
        },
        {
          field: "createdAt",
          order: "asc",
        },
        {
          field: "name",
          order: "asc",
        },
      ]
        .map((n) => {
          return `sortParams=${encodeURIComponent(JSON.stringify(n))}`;
        })
        .join("&")}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          parentId: categoryId,
          offset,
          size,
          userssoid: ssoId,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getAllPublishChildren = async (
  repoId: number,
  offset: number,
  size: number,
  title?: string,
  categoryId?: number,
  ssoId?: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<ICategoryMetadata | IDocumentMetadata>>
    >(
      `repositories/${repoId}/publish/children?${[
        {
          field: "type",
          order: "asc",
        },
        {
          field: "order",
          order: "asc",
        },
        {
          field: "createdAt",
          order: "asc",
        },
        {
          field: "name",
          order: "asc",
        },
      ]
        .map((n) => {
          return `sortParams=${encodeURIComponent(JSON.stringify(n))}`;
        })
        .join("&")}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          parentId: categoryId,
          offset,
          size,
          userssoid: ssoId,
          title,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getDomainPublishRepoList = async (
  accessToken: string,
  domainUrl: string,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IRepo>>
    >("repositories/publishRepoList", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        domainUrl,
      },
      params: {
        offset,
        size,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// ////////////////////// ACCESS_MANAGEMENT /////////////////////////////
export const getUsersOfResource = async (
  accessToken: string,
  resourceId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IGetUserAccesses>
    >(`acl/${resourceId}/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        offset,
        size,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const addAccessToResource = async (
  accessToken: string,
  resourceId: number,
  accessNames: string[],
  username: string,
  cascadeToChildren: boolean
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `acl/${resourceId}?addToRepoGroupHash=false`,
      {
        accessNames,
        username,
        cascadeToChildren,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteAccessOfResource = async (
  accessToken: string,
  resourceId: number,
  accessNames: string[],
  username: string,
  validate: boolean
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `acl/${resourceId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          accessNames,
          username,
          validate,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// /////////////////////////////// FEEDS SERVICES //////////////////////

export const getDomainPublicFeeds = async (
  domainId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IFeedItem>>
    >(`domain/${domainId}/feeds`, {
      params: {
        offset,
        size,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getDomainPrivateFeeds = async (
  accessToken: string,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IFeedItem>>
    >("report/social/userPosts", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        offset,
        size,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// /////////////////////////////// BRANCH SERVICES //////////////////////

export const getBranchList = async (
  accessToken: string,
  parentId: number | undefined,
  ownerSSOID: number | undefined,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IBranchList>>(
      "branch",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          parentId,
          ownerSSOID,
          offset,
          size,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getBranchInfo = async (
  accessToken: string,
  branchId: number | undefined
) => {
  try {
    const response = await axiosClasorInstance.get<any>(`branch/${branchId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createRootBranch = async (
  accessToken: string,
  name: string,
  repoType: string,
  username: string
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      "branch",
      { title: name, repoTypeName: repoType, ownerUsername: username },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createSubBranch = async (
  accessToken: string,
  branchId: number,
  name: string,
  repoType: string,
  username: string
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `branch/${branchId}`,
      { title: name, repoTypeName: repoType, ownerUsername: username },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const updateRootBranch = async (
  accessToken: string,
  name: string,
  username: string
) => {
  try {
    const response = await axiosClasorInstance.put<IServerResult<any>>(
      "branch",
      { title: name, ownerUsername: username },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const updateSubBranch = async (
  accessToken: string,
  branchId: number,
  name: string,
  username: string
) => {
  try {
    const response = await axiosClasorInstance.put<IServerResult<any>>(
      `branch/${branchId}`,
      { title: name, ownerUsername: username },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteBranch = async (accessToken: string, branchId: number) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `branch/${branchId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// /////////////////////////////// POSITION SERVICES //////////////////////

export const getPositionOfBranch = async (
  accessToken: string,
  branchId: number | undefined,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IPositionList>
    >(`branch/${branchId}/position`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        offset,
        size,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getPositionInfo = async (
  accessToken: string,
  branchId: number | undefined,
  positionName: string
) => {
  try {
    const response = await axiosClasorInstance.get<any>(
      `branch/${branchId}/position/${positionName}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const setPositionForBranch = async (
  accessToken: string,
  branchId: number,
  title: string,
  members?: string[]
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `branch/${branchId}/position`,
      { title, members },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const addMembersToPosition = async (
  accessToken: string,
  branchId: number,
  positionName: string,
  members: string[]
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `branch/${branchId}/position/${positionName}/members`,
      { members },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const setGrantsForPosition = async (
  accessToken: string,
  branchId: number,
  positionName: string,
  serviceNames: string[]
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `branch/${branchId}/position/${positionName}/blockGrants`,
      { serviceNames },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const assignPositionForSubBranch = async (
  accessToken: string,
  branchId: number,
  subBranchId: number,
  positionName: string
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `branch/${branchId}/position/${positionName}/subBranch/${subBranchId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const updatePosition = async (
  accessToken: string,
  branchId: number,
  positionName: string,
  title: string,
  members: string[]
) => {
  try {
    const response = await axiosClasorInstance.put<IServerResult<any>>(
      `branch/${branchId}/position/${positionName}`,
      { title, members },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteMembersFromPosition = async (
  accessToken: string,
  branchId: number,
  positionName: string,
  members: string[]
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `branch/${branchId}/position/${positionName}/members`,
      {
        data: {
          members,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deletePosition = async (
  accessToken: string,
  branchId: number,
  positionName: string
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `branch/${branchId}/position/${positionName}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getBranchUsers = async (
  accessToken: string,
  branchId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IBranchUserList>
    >(`branch/${branchId}/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        offset,
        size,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// ///////////////////////////////REPO TYPE////////////////////////////////////////

export const getRepoTypes = async (accessToken: string) => {
  try {
    const response = await axiosClasorInstance.get<any>("admin/repoTypes", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createRepoTypes = async (
  accessToken: string,
  name: string,
  username: string
) => {
  try {
    const response = await axiosClasorInstance.post<any>(
      "admin/repoTypes/user/BlogBox",
      { name, username },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteRepoType = async (accessToken: string, id: number) => {
  try {
    const response = await axiosClasorInstance.delete<any>(
      `admin/repoTypes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// /////////////////////////////// DOMAIN PUBLIC FEEDS //////////////////////

export const getDomainFeeds = async (
  accessToken: string,
  domainUrl: string,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IFeedItem>>
    >("domain/feeds", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        domainUrl,
      },
      params: {
        offset,
        size,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createDomainFeed = async (
  accessToken: string,
  domainUrl: string,
  name: string,
  content: string,
  link?: string,
  image?: string
) => {
  const data: any = {
    name,
    content,
  };

  if (link) {
    data.link = link;
  }
  if (image) {
    data.image = image;
  }
  try {
    const response = await axiosClasorInstance.post<IServerResult<IFeedItem>>(
      "domain/feeds",
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          domainUrl,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const updateDomainFeed = async (
  accessToken: string,
  domainUrl: string,
  feedId: number,
  name: string,
  content: string,
  link?: string,
  image?: string
) => {
  const data: any = {
    name,
    content,
  };

  if (link) {
    data.link = link;
  }
  if (image) {
    data.image = image;
  }
  try {
    const response = await axiosClasorInstance.put<IServerResult<IFeedItem>>(
      `domain/feeds/${feedId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          domainUrl,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteDomainFeed = async (
  accessToken: string,
  domainUrl: string,
  feedId: number
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `domain/feeds/${feedId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          domainUrl,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getFeedImages = async (offset: number, size: number) => {
  try {
    const response = await axiosClasorInstance.get<any>(
      "podSpace/publicFolder/images",
      {
        headers: {},
        params: {
          offset,
          size,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// /////////////////////////////// PRIVATE FFED //////////////////////

export const createPrivateFeed = async (
  accessToken: string,
  repoId: number,
  name: string,
  content: string,
  link?: string,
  image?: string
) => {
  const data: any = {
    name,
    content,
  };

  if (link) {
    data.link = link;
  }
  if (image) {
    data.image = image;
  }
  try {
    const response = await axiosClasorInstance.post<IServerResult<IFeedItem>>(
      `repositories/${repoId}/feeds`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const updatePrivateFeed = async (
  accessToken: string,
  repoId: number,
  feedId: number,
  name: string,
  content: string,
  link?: string,
  image?: string
) => {
  const data: any = {
    name,
    content,
  };

  if (link) {
    data.link = link;
  }
  if (image) {
    data.image = image;
  }
  try {
    const response = await axiosClasorInstance.put<IServerResult<IFeedItem>>(
      `repositories/${repoId}/feeds/${feedId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deletePrivateFeed = async (
  accessToken: string,
  repoId: number,
  feedId: number
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}/feeds/${feedId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/// /////////////////////////////// DOMAIN SUBSCRIPTION //////////////////////

export const getDomainSubscription = async (
  accessToken: string,
  domainUrl: string,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IDomainSubscriptionList>
    >("domain/subscription/requests", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        domainUrl,
      },
      params: {
        offset,
        size,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const rejectSubscription = async (
  accessToken: string,
  domainUrl: string,
  requestId: number
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `domain/subscription/request/${requestId}/reject`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          domainUrl,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const acceptSubscription = async (
  accessToken: string,
  domainUrl: string,
  requestId: number
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `domain/subscription/request/${requestId}/accept`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          domainUrl,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getCustomPostByDomain = async (
  domain: string
): Promise<IDomainMetadata> => {
  try {
    if (domain === "") {
      throw new NotFoundError(["ریسورس مورد نظر پیدا نشد."]);
    }

    const redisClient = await getRedisClient();
    const cachedDomain = await redisClient?.get(`domain:${domain}`);
    if (cachedDomain) {
      Logger.warn(
        JSON.stringify({
          type: "Redis cache data",
          data: cachedDomain,
        })
      );
      return JSON.parse(cachedDomain);
    }
    const { data } = await axiosClasorInstance.get<
      IClasorResult<IClasorDomainResult>
    >("domain/info", {
      headers: {
        domainUrl: domain,
      },
    });

    const sensitiveStringData = await decryptKey(
      data.data.sensitiveData,
      process.env.CRYPTO_SECRET_KEY!,
      process.env.CRYPTO_INIT_VECTOR_KEY!
    );
    const sensitiveData = JSON.parse(sensitiveStringData);

    const domainInfo = {
      ...data.data,
      ...sensitiveData,
    };

    if (domainInfo) {
      await redisClient?.set(`domain:${domain}`, JSON.stringify(domainInfo), {
        EX: 60 * 60,
      });
    }

    return domainInfo as IDomainMetadata;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};
