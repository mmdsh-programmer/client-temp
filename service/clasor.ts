import { ISortProps } from "@atom/sortParam";
import {
  IAccessRequest,
  IAccessRequestResponse,
} from "@interface/accessRequest.interface";
import {
  IChildrenFilter,
  IClasorError,
  IGetToken,
  IReportFilter,
  IServerResult,
  IUserInfo,
} from "@interface/app.interface";
import { ICategory, ICategoryMetadata } from "@interface/category.interface";
import { IContentSearchResult } from "@interface/contentSearch.interface";
import {
  IClasorField,
  IDocument,
  IDocumentMetadata,
  IWhiteList,
} from "@interface/document.interface";
import { EDocumentTypes } from "@interface/enums";
import { IFile, IPodspaceResult } from "@interface/file.interface";
import {
  ICreateGroup,
  IGetGroup,
  IGetGroups,
  IUpdateGroup,
} from "@interface/group.interface";
import {
  IPublicKey,
  IRepo,
  IReport,
  IListResponse,
} from "@interface/repo.interface";
import { ITag } from "@interface/tags.interface";
import { IRoles, IUser } from "@interface/users.interface";
import {
  IAddVersion,
  IFileVersion,
  IVersion,
} from "@interface/version.interface";
import {
  AuthorizationError,
  ForbiddenError,
  InputError,
  NotFoundError,
  ServerError,
} from "@utils/error";
import Logger from "@utils/logger";
import axios, { AxiosError, isAxiosError } from "axios";
import qs from "qs";

const { CLASOR } = process.env;

const axiosClasorInstance = axios.create({
  baseURL: CLASOR,
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
    const message = [error.response?.data.messages[0] || error.message];
    switch (error.response?.status) {
      case 400:
        throw new InputError(message);
      case 401:
        throw new AuthorizationError(message);
      case 403:
        throw new ForbiddenError(message);
      case 404:
        throw new NotFoundError(message);
      default:
        throw new ServerError(message);
    }
  } else {
    throw new ServerError(["حطای نامشخصی رخ داد"]);
  }
};

/////////////////////// AUTH ///////////////////
export const handleRedirect = async (redirectUrl: string) => {
  try {
    const response = await axiosClasorInstance.get(
      `auth/loginUrl?redirectUrl=${redirectUrl}`
    );

    return response.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getToken = async (code: string, redirect_uri: string) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<IGetToken>>(
      "auth/login",
      { code: code, redirectUrl: redirect_uri }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const userInfo = async (access_token: string) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IUserInfo>>(
      "auth/getMe",
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

export const renewToken = async (refresh_token: string) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<IGetToken>>(
      "auth/renewToken",
      {
        refreshToken: refresh_token,
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

////////////////////////// INFO /////////////////////////
export const getMyInfo = async (access_token: string) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<any>>(
      "myInfo",
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

///////////////////////// REPORT //////////////////////
export const getReport = async (access_token: string, repoId: number) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IReport>>(
      `repositories/${repoId}/report`,
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

////////////////////// REPOSITORY /////////////////////////
export const getAllRepositories = async (
  access_token: string,
  offset: number,
  size: number,
  name?: string
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IRepo>>
    >("repositories", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        offset,
        size,
        title: name,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getRepositoryKeys = async (
  access_token: string,
  repoId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<IListResponse<IPublicKey>>(
      `repositories/${repoId}/publicKey`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
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
  access_token: string,
  repoId: number,
  keyId: number
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}/publicKey/${keyId}`,
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

export const createRepositoryKey = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getMyRepositories = async (
  access_token: string,
  offset: number,
  size: number,
  archived: boolean,
  name?: string
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IRepo>>
    >("repositories/myRepoList", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        offset,
        size,
        archived,
        title: name,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getRepository = async (
  access_token: string,
  repoId: number | null
) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IRepo>>(
      `repositories/${repoId}`,
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

export const getAccessRepositories = async (
  access_token: string,
  offset: number,
  size: number,
  name?: string
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IRepo>>
    >("repositories/myAccessRepoList", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        offset,
        size,
        title: name,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getBookmarkRepositories = async (
  access_token: string,
  offset: number,
  size: number,
  name?: string
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IRepo>>
    >("repositories/myBookmarkList", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        offset,
        size,
        title: name,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const editRepo = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteRepository = async (
  access_token: string,
  repoId: number
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}`,
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

export const archiveRepository = async (
  access_token: string,
  repoId: number
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `repositories/${repoId}/archive`,
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

export const restoreRepository = async (
  access_token: string,
  repoId: number
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `repositories/${repoId}/restore`,
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

export const createRepo = async (
  access_token: string,
  name: string,
  description?: string
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      "repositories",
      {
        name,
        description,
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

export const leaveRepository = async (access_token: string, repoId: number) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}/leftRepo`,
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

export const bookmarkRepository = async (
  access_token: string,
  repoId: number,
  detach?: boolean
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `repositories/${repoId}/bookmark`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
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
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const transferOwnershipRepository = async (
  access_token: string,
  repoId: number,
  userName: string
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `repositories/${repoId}/owner/${userName}`,
      { userName },
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

////////////////////////// USERS ///////////////////////
export const getRepositoryUsers = async (
  access_token: string,
  repoId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IUser>>
    >(`repositories/${repoId}/acl/getRepoUsers`, {
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

export const getRepositoryInviteRequestsByOwner = async (
  access_token: string,
  repoId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IAccessRequest>>
    >(`repositories/${repoId}/userAccessRequest`, {
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

export const getRoles = async (access_token: string) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IRoles[]>>(
      "admin/getRoles",
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

export const addUserToRepo = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const editUserRole = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteUser = async (
  access_token: string,
  repoId: number,
  userName: string
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}/acl`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
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
  access_token: string,
  repoId: number,
  userId: number
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}/userAccessRequest/${userId}`,
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

///////////////////////////// GROUPS ///////////////////////
export const getRepositoryGroups = async (
  access_token: string,
  repoId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IGetGroups>>
    >(`repositories/${repoId}/groups/getRepoGroups`, {
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

export const getGroupInfo = async (
  access_token: string,
  repoId: number,
  title: string
) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IGetGroup>>(
      `${CLASOR}/repositories/${repoId}/groups/${title}`,
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

export const createGroup = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const updateGroup = async (
  access_token: string,
  repoId: number,
  title: string,
  description?: string,
  members?: string[]
) => {
  try {
    const response = await axiosClasorInstance.patch<
      IServerResult<IUpdateGroup>
    >(
      `repositories/${repoId}/groups/${title}`,
      { title, description, members, memberType: "username" },
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

export const deleteGroup = async (
  access_token: string,
  repoId: number,
  title: string
) => {
  try {
    const response = await axiosClasorInstance.delete<
      IServerResult<IUpdateGroup>
    >(`repositories/${repoId}/groups/${title}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

/////////////////////////// TAGS /////////////////////
export const getRepositoryTags = async (
  access_token: string,
  repoId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<ITag>>
    >(`repositories/${repoId}/tags`, {
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

export const createTag = async (
  access_token: string,
  repoId: number,
  name: string
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `repositories/${repoId}/tags`,
      { name },
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

export const editTag = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteTag = async (
  access_token: string,
  repoId: number,
  idTag: number
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}/tags/${idTag}`,
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

////////////////////// CATEGORY ////////////////////////
export const getChildren = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
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

export const createCategory = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const editCategory = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteCategory = async (
  access_token: string,
  repoId: number,
  categoryId: number,
  forceDelete: boolean
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<ICategory>>(
      `repositories/${repoId}/categories/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
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
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
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
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

//////////////////////// CONTENT ///////////////////////
export const getContent = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
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

////////////////////////////// REPORT ////////////////////
export const getUserDocument = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
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

/////////////////////// BULK ////////////////////
export const moveBulk = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteBulk = async (
  access_token: string,
  repoId: number,
  children: number[],
  forceDelete?: boolean
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}/categories/deleteChildren`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
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

///////////////////////// DOCUMENT ///////////////////////
export const getDocument = async (
  access_token: string,
  repoId: number,
  documentId: number,
  offset?: number,
  size?: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IDocumentMetadata>
    >(
      `repositories/${repoId}/documents/${documentId}/info?type=document&sortParams[]={"field": "createdAt", "order": "asc" }`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
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

export const getClasorField = async (access_token: string) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IClasorField[]>
    >(`clasorFields`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createDocument = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createDocumentTemplate = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const editDocument = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteDocument = async (
  access_token: string,
  repoId: number,
  documentId: number
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<IDocument>>(
      `repositories/${repoId}/documents/${documentId}`,
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

export const bookmarkDocument = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
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
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
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
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getDocumentWhiteBlackList = async (
  access_token: string,
  repoId: number,
  documentId: number
) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IWhiteList>>(
      `repositories/${repoId}/documents/${documentId}/getUserList`,
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

export const addToDocumentBlackList = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const addToDocumentWhiteList = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createDocumentPassword = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const updateDocumentPassword = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteDocumentPassword = async (
  access_token: string,
  repoId: number,
  documentId: number,
  oldPassword: string
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<IDocument>>(
      `repositories/${repoId}/documents/${documentId}/password`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
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

///////////////////// VERSION //////////////////
export const getVersion = async (
  access_token: string,
  repoId: number,
  documentId: number,
  versionId: number,
  state?: "draft" | "version" | "public",
  innerDocument?: boolean,
  innerOutline?: boolean
) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IVersion>>(
      `repositories/${repoId}/documents/${documentId}/versions/${versionId}${state === "draft" ? "/draft" : state === "public" ? "/publicVersion" : ""}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
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
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const createFileVersion = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteVersion = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const getLastVersion = async (
  access_token: string,
  repoId: number,
  documentId: number
) => {
  try {
    const response = await axiosClasorInstance.get<IServerResult<IVersion>>(
      `repositories/${repoId}/documents/${documentId}/lastVersion`,
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

export const setLastVersion = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const publicVersion = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const cancelPublicVersion = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const confirmVersion = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const cancelConfirmVersion = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

///////////////////// FILES ///////////////////////////
export const getResourceFiles = async (
  access_token: string,
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
        Authorization: `Bearer ${access_token}`,
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
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deleteFile = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
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

/////////////////////////// RELEASE DOCS //////////////////////////
export const getPendingDrafts = async (
  access_token: string,
  repoId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IVersion>>
    >(`repositories/${repoId}/getPendingDrafts`, {
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

export const getPendingVersion = async (
  access_token: string,
  repoId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IListResponse<IVersion>>
    >(`admin/${repoId}/getRepoPendingVersion`, {
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

///////////////////////// PUBLIC LINK ///////////////////
export const createRepoPublicLink = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deletePublicLink = async (
  access_token: string,
  repoId: number,
  roleId: number
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}/publicLink`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        data: {
          roleId,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const subscribeRepo = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};
/////////////////////////// PUBLISH /////////////////////
export const createRepoPublishLink = async (
  access_token: string,
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
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return handleClasorStatusError(error as AxiosError<IClasorError>);
  }
};

export const deletePublishLink = async (
  access_token: string,
  repoId: number
) => {
  try {
    const response = await axiosClasorInstance.delete<IServerResult<any>>(
      `repositories/${repoId}/publish`,
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

//////////////////////// REQUESTS ///////////////////
export const getUserToRepoRequests = async (
  access_token: string,
  offset: number,
  size: number
) => {
  try {
    const response = await axiosClasorInstance.get<
      IServerResult<IAccessRequestResponse>
    >("acl/userRequests", {
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

export const acceptUserToRepoRequest = async (
  access_token: string,
  requestId: number
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `acl/userRequest/${requestId}/accept`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
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
  access_token: string,
  requestId: number
) => {
  try {
    const response = await axiosClasorInstance.patch<IServerResult<any>>(
      `acl/userRequest/${requestId}/reject`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
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

///////////////////////// FEEDBACK /////////////////////
export const sendFeedback = async (
  access_token: string,
  content: string,
  fileHashList: string[]
) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<any>>(
      `feedback`,
      { message: content, fileHash: fileHashList },
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

export const addUserToFeedbackGroupHash = async (access_token: string) => {
  try {
    const response = await axiosClasorInstance.post<IServerResult<{isAddUser: boolean}>>(
      `feedback/addUser`,
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
