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
import { ICategory, ICategoryMetadata } from "@interface/category.interface";
import {
  IChildrenFilter,
  IClasorError,
  IGetToken,
  IMyInfo,
  IReportFilter,
  IServerResult,
  IUserInfo,
} from "@interface/app.interface";
import {
  IClasorField,
  IDocument,
  IDocumentMetadata,
  IWhiteList,
} from "@interface/document.interface";
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
  IReport,
} from "@interface/repo.interface";
import { IRoles, IUser } from "@interface/users.interface";
import axios, { AxiosError, isAxiosError } from "axios";

import { EDocumentTypes } from "@interface/enums";
import { IBLockDocument } from "@interface/editor.interface";
import { IClasorReport } from "@interface/clasorReport";
import { IContentSearchResult } from "@interface/contentSearch.interface";
import { IOfferResponse } from "@interface/offer.interface";
import { ISortProps } from "@atom/sortParam";
import { ITag } from "@interface/tags.interface";
import Logger from "@utils/logger";
import qs from "qs";

const { BACKEND_URL } = process.env;

const axiosClasorInstance = axios.create({
  baseURL: BACKEND_URL,
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

export const userInfo = async (accessToken: string) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IUserInfo>>(
      "auth/getMe",
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

export const renewToken = async (refreshToken: string) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<IGetToken>>(
      "auth/renewToken",
      {
        refreshToken,
      }
    );

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
  repoTypes?: string
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
    const response = await axiosClasorInstance.get<IListResponse<IPublicKey>>(
      `repositories/${repoId}/publicKey`,
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

    return response.data;
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
  keyId: number
) => {
  try {
    const response = await axiosClasorInstance.get<IPublicKey>(
      `repositories/${repoId}/publicKey/${keyId}`,
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

export const getMyRepositories = async (
  accessToken: string,
  offset: number,
  size: number,
  archived: boolean,
  name?: string,
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
        repoTypes,
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
  description?: string,
  repoTypes?: string[]
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
    console.log(
      "==================== clasor create repo ===================",
      error
    );
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
  size: number
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
  name: string
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `repositories/${repoId}/tags`,
      { name },
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

export const editTag = async (
  accessToken: string,
  repoId: number,
  tagId: number,
  name: string
) => {
  try {
    const response = await axiosClasorInstance.put<IServerResult<any>>(
      `repositories/${repoId}/tags/${tagId}`,
      { name },
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

export const deleteTag = async (
  accessToken: string,
  repoId: number,
  idTag: number
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}/tags/${idTag}`,
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
            arrayFormat: "repeat",
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
  order: number | null
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<ICategory>>(
      `repositories/${repoId}/categories`,
      {
        parentId,
        name,
        description,
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
      { name, description, order, isHidden, parentId },
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
  repoId: number,
  sortParams: ISortProps,
  offset: number,
  size: number,
  filters?: IReportFilter | null
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
          repoType: "clasor",
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
            arrayFormat: "repeat",
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
  versionId: number
) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IVersion>>(
      `repositories/${repoId}/publish/document/${documentId}/versions/${versionId}`
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getPublishDocumentLastVersion = async (
  repoId: number,
  documentId: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IVersion | null>
    >(`repositories/${repoId}/publish/document/${documentId}/lastVersion`);

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
  order?: number,
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
        order: order && order > 0 ? order : undefined,
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
  tagIds?: number[]
) => {
  try {
    const response = await axiosClasorInstance.put<IServerResult<IDocument>>(
      `repositories/${repoId}/documents/${documentId}`,
      { categoryId, title, contentType, order, description, isHidden, tagIds },
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
  console.log("---------------------- white list -------------", usernameList);
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
  oldPassword: string,
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
  documentId: number
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/enableUserGroup`,
      {},
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

/// ////////////////// VERSION //////////////////
export const getVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionId: number | undefined,
  state?: "draft" | "version" | "public",
  innerDocument?: boolean,
  innerOutline?: boolean
) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IVersion>>(
      `repositories/${repoId}/documents/${documentId}/versions/${versionId}${state === "draft" ? "/draft" : state === "public" ? "/publicVersion" : ""}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          innerDocument,
          innerOutline,
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
  outline: string
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<IAddVersion>>(
      `repositories/${repoId}/documents/${documentId}/versions`,
      { versionNumber, content, outline },
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

export const createFileVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionNumber: string,
  fileHash?: IFileVersion
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/versions`,
      { versionNumber, fileHash },
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

export const deleteVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionId: number,
  state: string
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
  documentId: number
) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IVersion>>(
      `repositories/${repoId}/documents/${documentId}/lastVersion`,
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

export const setLastVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionId: number
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<IVersion>>(
      `repositories/${repoId}/documents/${documentId}/lastVersion`,
      { versionId },
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

export const publicVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionId: number
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/versions/${versionId}/publicVersion`,
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

export const cancelPublicVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionId: number
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/versions/${versionId}/privateVersion`,
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

export const confirmVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionId: number
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<IVersion>>(
      `repositories/${repoId}/documents/${documentId}/versions/${versionId}/publishDraft`,
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

export const cancelConfirmVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionId: number
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/versions/${versionId}/status`,
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

/// ////////////////// FILES ///////////////////////////
export const getResourceFiles = async (
  accessToken: string,
  resourceId: number,
  userGroupHash: string,
  offset: number,
  size: number,
  name?: string,
  order?: string,
  dataType?: string
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<
        IPodspaceResult<{
          list: IFile[];
          count: number;
        }>
      >
    >(`fileManagement/resource/${resourceId}/userGroup/${userGroupHash}`, {
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
      `fileManagement/resource/${resourceId}/rename/file/${hash}/newName/${newName}`,
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
    const response = await axiosClasorInstance.post<IServerResult<any>>(
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
  docId: number,
  versionId: number
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `repositories/${repoId}/documents/${docId}/versions/${versionId}/accept`,
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
  docId: number,
  versionId: number
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `repositories/${repoId}/documents/${docId}/versions/${versionId}/reject`,
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
  expireTime: number,
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
    const response = await axiosClasorInstance.post<IServerResult<any>>(
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
  outline: string
) => {
  try {
    const response = await axiosClasorInstance.put<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/versions/${versionId}`,
      { content, outline, versionNumber },
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
  }
) => {
  try {
    const response = await axiosClasorInstance.put<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/versions/${versionId}`,
      { fileHash, versionNumber },
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

export const freeDraftVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionId: number,
  versionNumber: string,
  content: string,
  outline: string
) => {
  try {
    const response = await axiosClasorInstance.put<IServerResult<any>>(
      `repositories/${repoId}/documents/${documentId}/versions/${versionId}/freeDraft`,
      { versionNumber, content, outline },
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

export const createBlockVersion = async (
  accessToken: string,
  repoId: number,
  documentId: number,
  versionId: number
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
  fileHashList: string[]
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
  repoType?: string,
  userssoid?: number
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
        repoType,
        userssoid,
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
