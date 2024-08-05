import { ISortProps } from "@atom/sortParam";
import { IAccessRequest } from "@interface/accessRequest.interface";
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

export const getRepository = async (access_token: string, repoId: number) => {
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
  fileHash: string
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
  title: string
) => {
  try {
    const response = await axiosClasorInstance.post<
      IServerResult<ICreateGroup>
    >(`repositories/${repoId}/groups`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

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
  repoId: number | undefined,
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
  const body = { parentId, name, description, order };
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/categories`,
      {
        method: "POST",
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        body: JSON.stringify(body),
        next: { tags: ["create-category"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<ICategory>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const editCategory = async (
  access_token: string,
  repoId: number | undefined,
  categoryId: number | undefined | null,
  // parentId: number | null,
  name: string,
  description: string,
  order: number | null,
  isHidden: boolean
) => {
  const body = { name, description, order, isHidden };
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/categories/${categoryId}`,
      {
        method: "PUT",
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        body: JSON.stringify(body),
        next: { tags: ["edit-category"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<ICategory>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const deleteCategory = async (
  access_token: string,
  repoId: number,
  categoryId: number,
  forceDelete: boolean
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/categories/${categoryId}?forceDelete=${forceDelete}`,
      {
        method: "DELETE",
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        next: { tags: ["deleteCategory"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<ICategory>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

//////////////////////// CONTENT ///////////////////////
export const getContent = async (
  access_token: string,
  repoId: number | undefined,
  searchParam: string,
  offset: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${CLASOR}/publicContent/repository/${repoId}/search/${encodeURIComponent(searchParam)}?offset=${offset}&size=${size}`,
      {
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
        } as any,
        next: { tags: ["getContent"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<IContentSearchResult>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

////////////////////////////// REPORT ////////////////////
export const getUserDocument = async (
  access_token: string,
  repoId: number | undefined,
  sortParams: ISortProps,
  offset: number,
  size: number,
  filters?: IReportFilter | null
) => {
  const params = {
    repoId,
    repoType: "clasor",
    offset: offset,
    size,
    title: filters?.title || undefined,
    contentTypes: filters?.contentTypes,
    tagIds: filters?.tagIds,
    slug: filters?.slug || undefined,
    bookmarked: filters?.bookmarked,
    isTemplate: filters?.isTemplate,
    withTemplate: !filters?.isTemplate,
  };

  const filteredParams = Object.entries(params).reduce(
    (acc: any, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );

  const queryString = new URLSearchParams(filteredParams).toString();

  // &title=${title}&contentTypes=${filters?.contentTypes}&tagIds=${filters?.tagIds}&bookmarked=${filters?.bookmarked}&isTemplate=${filters?.isTemplate}&withTemplate=${!filters?.isTemplate}&type=${finalType}
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/categories/getChildren?${[
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
        .join("&")}&offset=${offset}&size=${size}&${queryString}`,
      {
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
        } as any,
        next: { tags: ["getChildren"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    console.log("-------------------- data ------------------", data);
    return data as IServerResult<
      IListResponse<ICategoryMetadata | IDocumentMetadata>
    >;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

/////////////////////// BULK ////////////////////
export const moveBulk = async (
  access_token: string,
  repoId: number | undefined,
  parentId: number | null,
  children: number[]
) => {
  const body = {
    parentId,
    children,
  };
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/categories/moveChildren`,
      {
        method: "PATCH",
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        body: JSON.stringify(body),
        next: { tags: ["move-bulk"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<any>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const deleteBulk = async (
  access_token: string,
  repoId: number | undefined,
  children: number[],
  forceDelete?: boolean
) => {
  const body = {
    children,
  };
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/categories/deleteChildren?forceDelete=${forceDelete}`,
      {
        method: "DELETE",
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        body: JSON.stringify(body),
        next: { tags: ["delete-bulk"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<any>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

///////////////////////// DOCUMENT ///////////////////////
export const getDocument = async (
  access_token: string,
  repoId: number | undefined,
  documentId?: number
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/documents/${documentId}/info`,
      {
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
        } as any,
        next: { tags: ["getDocumentInfo"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<IDocumentMetadata>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const getClasorField = async (access_token: string) => {
  try {
    const response = await fetch(`${CLASOR}/clasorFields`, {
      headers: {
        _token_: access_token,
        _token_issuer_: 1,
        Authorization: "Bearer " + access_token,
      } as any,
      next: { tags: ["getClasorFields"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<IClasorField[]>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const createDocument = async (
  access_token: string,
  repoId: number | undefined,
  categoryId: number | undefined,
  title: string,
  description: string | undefined,
  contentType: EDocumentTypes,
  isTemplate: boolean,
  order?: number,
  imageUrl?: string,
  publicKeyId?: string
) => {
  const body = {
    title,
    contentType,
    categoryId,
    description,
    imageUrl,
    order: order && order > 0 ? order : undefined,
    isTemplate,
    publicKeyId,
  };
  try {
    const response = await fetch(`${CLASOR}/repositories/${repoId}/documents`, {
      method: "POST",
      headers: {
        _token_: access_token,
        _token_issuer_: 1,
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      } as any,
      body: JSON.stringify(body),
      next: { tags: ["create-document"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<IDocument>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const createDocumentTemplate = async (
  access_token: string,
  repoId: number | undefined,
  categoryId: number | undefined,
  title: string,
  description: string | undefined,
  contentType: EDocumentTypes,
  versionNumber: string,
  templateId: number,
  order?: number,
  imageUrl?: string
) => {
  const body = {
    title,
    contentType,
    categoryId,
    description,
    imageUrl,
    order,
  };
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/documents/withDraft/${versionNumber}/template/${templateId}`,
      {
        method: "POST",
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        body: JSON.stringify(body),
        next: { tags: ["create-document-template"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<IDocument>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const editDocument = async (
  access_token: string,
  repoId: number | undefined,
  documentId: number,
  categoryId: number | null,
  title: string,
  description: string | undefined,
  contentType: EDocumentTypes,
  order?: number | null,
  isHidden?: boolean,
  tagIds?: number[]
) => {
  const body = {
    categoryId,
    title,
    contentType,
    order,
    description,
    isHidden,
    tagIds,
  };
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/documents/${documentId}`,
      {
        method: "PUT",
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        body: JSON.stringify(body),
        next: { tags: ["edit-document"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<IDocument>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const deleteDocument = async (
  access_token: string,
  repoId: number,
  documentId: number
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/documents/${documentId}`,
      {
        method: "DELETE",
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        next: { tags: ["deleteDocument"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<IDocument>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

///////////////////// VERSION //////////////////
export const createVersion = async (
  access_token: string,
  repoId: number | undefined,
  documentId: number,
  versionNumber: string,
  content: string,
  outline: string
) => {
  const body = {
    versionNumber,
    content,
    outline,
  };
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/documents/${documentId}/versions`,
      {
        method: "POST",
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        body: JSON.stringify(body),
        next: { tags: ["create-version"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<IAddVersion>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const createFileVersion = async (
  access_token: string,
  repoId: number | undefined,
  documentId: number,
  versionNumber: string,
  fileHash?: IFileVersion
) => {
  const body = {
    versionNumber,
    fileHash,
  };
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/documents/${documentId}/versions`,
      {
        method: "POST",
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        body: JSON.stringify(body),
        next: { tags: ["create-file-version"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<unknown>;
  } catch (error) {
    console.log("============ error ==========", error);
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
  let baseUrl = name
    ? `${CLASOR}/fileManagement/resource/${resourceId}/userGroup/${userGroupHash}?offset=${offset}&size=${size}&name=${name}`
    : `${CLASOR}/fileManagement/resource/${resourceId}/userGroup/${userGroupHash}?offset=${offset}&size=${size}`;

  try {
    const response = await fetch(`${baseUrl}`, {
      headers: {
        _token_: access_token,
        _token_issuer_: 1,
        Authorization: "Bearer " + access_token,
      } as any,
      next: { tags: ["getRepositoryFiles"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<
      IPodspaceResult<{
        list: IFile[];
        count: number;
      }>
    >;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const editFile = async (
  access_token: string,
  resourceId: number,
  newName: string,
  hash: string
) => {
  try {
    const response = await fetch(
      `${CLASOR}/fileManagement/resource/${resourceId}/rename/file/${hash}/newName/${newName}`,
      {
        method: "PATCH",
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        body: JSON.stringify({ newName }),
        next: { tags: ["editFile"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as any;
  } catch (error) {
    console.log("============ error ==========", error);
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
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/files/resource/${resourceId}/fileHash/${fileHash}?type=${type}`,
      {
        method: "DELETE",
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        next: { tags: ["deleteFile"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as any;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

/////////////////////////// RELEASE DOCS //////////////////////////
export const getPendingDrafts = async (
  access_token: string,
  repoId: number | undefined,
  offset: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/getPendingDrafts?offset=${offset}&size=${size}`,
      {
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        next: { tags: ["pending-draft"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<{
      list: IVersion[];
      total: number;
      offset: number;
      size: number;
    }>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const getPendingVersion = async (
  access_token: string,
  repoId: number | undefined,
  offset: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${CLASOR}/admin/${repoId}/getRepoPendingVersion?offset=${offset}&size=${size}`,
      {
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        next: { tags: ["pending-version"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<{
      list: IVersion[];
      total: number;
      offset: number;
      size: number;
    }>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};
