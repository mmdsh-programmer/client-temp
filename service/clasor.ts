import { ISortProps } from "@atom/sortParam";
import { IAccessRequestResponse } from "@interface/accessRequest.interface";
import {
  IChildrenFilter,
  IReportFilter,
  IServerResult,
} from "@interface/app.interface";
import { ICategory, ICategoryChildren } from "@interface/category.interface";
import { IContentSearchResult } from "@interface/contentSearch.interface";
import {
  IClasorField,
  IDocument,
  IDocumentMetadata,
} from "@interface/document.interface";
import { EDocumentTypes } from "@interface/enums";
import {
  ICreateGroup,
  IGetGroup,
  IGroupResult,
  IUpdateGroup,
} from "@interface/group.interface";
import {
  IPublicKey,
  IRepo,
  IReport,
  IResponse,
} from "@interface/repo.interface";
import { ITags } from "@interface/tags.interface";
import { IRoles, IUserResponse } from "@interface/users.interface";
import {
  IAddVersion,
  IFileVersion,
  IVersion,
} from "@interface/version.interface";

const { CLASOR } = process.env;

/////////////////////// AUTH ///////////////////
export const handleRedirect = async (redirectUrl: string) => {
  try {
    const response = await fetch(
      `${CLASOR}/auth/loginUrl?redirectUrl=${redirectUrl}`,
      {
        next: { tags: ["loginUrl"] },
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

export const getToken = async (code: string, redirect_uri: string) => {
  try {
    const response = await fetch(`${CLASOR}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code, redirectUrl: redirect_uri }),
      next: { tags: ["login"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as any;
  } catch (error) {
    console.log("============ error get token ==========", error);
  }
};

export const userInfo = async (access_token: string) => {
  try {
    const response = await fetch(`${CLASOR}/auth/getMe`, {
      headers: {
        _token_: access_token,
        _token_issuer_: 1,
        Authorization: "Bearer " + access_token,
      } as any,
      next: { tags: ["getMe"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as any;
  } catch (error) {
    console.log("============ error get token ==========", error);
  }
};

export const renewToken = async (refresh_token: string) => {
  console.log(
    "=============== service refresh token ==========",
    refresh_token
  );
  try {
    const response = await fetch(`${CLASOR}/auth/renewToken`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refresh_token }),
      next: { tags: ["renewToken"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    console.log("================= data refresh token ==========", data);
    return data as any;
  } catch (error) {
    console.log("============ error renew token ==========", error);
  }
};

////////////////////////// INFO /////////////////////////
export const getMyInfo = async (access_token: string) => {
  try {
    const response = await fetch(`${CLASOR}/myInfo`, {
      headers: {
        _token_: access_token,
        _token_issuer_: 1,
        Authorization: "Bearer " + access_token,
      } as any,
      next: { tags: ["myInfo"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as any;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

///////////////////////// REPORT //////////////////////
export const getReport = async (access_token: string, repoId: number) => {
  try {
    const response = await fetch(`${CLASOR}/repositories/${repoId}/report`, {
      headers: {
        _token_: access_token,
        _token_issuer_: 1,
        Authorization: "Bearer " + access_token,
      } as any,
      next: { tags: ["getReport"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<IReport>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

////////////////////// REPOSITORY /////////////////////////
export const getAllRepositories = async (
  access_token: string,
  offset: number,
  size: number,
  name: string | undefined
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories?offset=${offset}&size=${size}&title=${name || ""}`,
      {
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        next: { tags: ["allRepoList"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<IResponse<IRepo>>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const getRepositoryKeys = async (
  access_token: string,
  repoId: number,
  offset: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/publicKey?offset=${offset}&size=${size}`,
      {
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        next: { tags: [`repo-${repoId}-keys`] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IResponse<IPublicKey>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const deleteRepositoryKey = async (
  access_token: string,
  repoId: number,
  keyId: number
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/publicKey/${keyId}`,
      {
        method: "DELETE",
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const createRepositoryKey = async (
  access_token: string,
  repoId: number,
  name: string,
  key: string
) => {
  try {
    const response = await fetch(`${CLASOR}/repositories/${repoId}/publicKey`, {
      method: "POST",
      headers: {
        _token_: access_token,
        _token_issuer_: 1,
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      } as any,
      body: JSON.stringify({
        name,
        key,
      }),
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const getMyRepositories = async (
  access_token: string,
  offset: number,
  size: number,
  archived: boolean,
  name: string | undefined
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/myRepoList?offset=${offset}&size=${size}&archived=${archived}`,
      {
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
        } as any,
        next: { tags: ["myRepoList"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<IResponse<IRepo>>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const getRepository = async (access_token: string, repoId: number) => {
  try {
    const response = await fetch(`${CLASOR}/repositories/${repoId}`, {
      headers: {
        _token_: access_token,
        _token_issuer_: 1,
        Authorization: "Bearer " + access_token,
      } as any,
      next: { tags: ["repo"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as any;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const getAccessRepositories = async (
  access_token: string,
  offset: number,
  size: number,
  name: string | undefined
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/myAccessRepoList?offset=${offset}&size=${size}`,
      {
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
        } as any,
        next: { tags: ["myAccessRepoList"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<IResponse<IRepo>>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const getBookmarkRepositories = async (
  access_token: string,
  offset: number,
  size: number,
  name: string | undefined
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/myBookmarkList?offset=${offset}&size=${size}`,
      {
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
        } as any,
        next: { tags: ["bookmarkRepoList"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<IResponse<IRepo>>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const editRepo = async (
  access_token: string,
  repoId: number,
  name: string,
  description: string
) => {
  try {
    const response = await fetch(`${CLASOR}/repositories/${repoId}`, {
      method: "PUT",
      headers: {
        _token_: access_token,
        _token_issuer_: 1,
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      } as any,
      body: JSON.stringify({ name: name, description: description }),
      next: { tags: ["edit-repo"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as any;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const deleteRepository = async (
  access_token: string,
  repoId: number
) => {
  try {
    const response = await fetch(`${CLASOR}/repositories/${repoId}`, {
      method: "DELETE",
      headers: {
        _token_: access_token,
        _token_issuer_: 1,
        Authorization: "Bearer " + access_token,
      } as any,
      next: { tags: ["deleteRepo"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as any;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const archiveRepository = async (
  access_token: string,
  repoId: number
) => {
  try {
    const response = await fetch(`${CLASOR}/repositories/${repoId}/archive`, {
      method: "PATCH",
      headers: {
        _token_: access_token,
        _token_issuer_: 1,
        Authorization: "Bearer " + access_token,
      } as any,
      next: { tags: ["archiveRepo"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as any;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const restoreRepository = async (
  access_token: string,
  repoId: number
) => {
  try {
    const response = await fetch(`${CLASOR}/repositories/${repoId}/restore`, {
      method: "PATCH",
      headers: {
        _token_: access_token,
        _token_issuer_: 1,
        Authorization: "Bearer " + access_token,
      } as any,
      next: { tags: ["restoreRepo"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as any;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const createRepo = async (
  access_token: string,
  name: string,
  description?: string
) => {
  try {
    const response = await fetch(`${CLASOR}/repositories`, {
      method: "POST",
      headers: {
        _token_: access_token,
        _token_issuer_: 1,
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      } as any,
      body: JSON.stringify({ name, description }),
      next: { tags: ["create-repo"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as any;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const leaveRepository = async (access_token: string, repoId: number) => {
  try {
    const response = await fetch(`${CLASOR}/repositories/${repoId}/leftRepo`, {
      method: "DELETE",
      headers: {
        _token_: access_token,
        _token_issuer_: 1,
        Authorization: "Bearer " + access_token,
      } as any,
      next: { tags: ["leftRepo"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as any;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const bookmarkRepository = async (
  access_token: string,
  repoId: number,
  detach?: boolean
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/bookmark?detach=${detach}`,
      {
        method: "PATCH",
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
        } as any,
        next: { tags: ["bookmarkRepo"] },
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

export const imageRepository = async (
  access_token: string,
  repoId: number,
  fileHash: string
) => {
  try {
    const response = await fetch(`${CLASOR}/repositories/${repoId}/image`, {
      method: "PUT",
      headers: {
        _token_: access_token,
        _token_issuer_: 1,
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      } as any,
      body: JSON.stringify({ fileHash }),

      next: { tags: ["bookmarkRepo"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as any;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

////////////////////////// USERS ///////////////////////
export const getRepositoryUsers = async (
  access_token: string,
  repoId: number | undefined,
  offset: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/acl/getRepoUsers?offset=${offset}&size=${size}`,
      {
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
        } as any,
        next: { tags: ["getRepositoryUsers"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<IUserResponse>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const getRepositoryInviteRequestsByOwner = async (
  access_token: string,
  repoId: number | undefined,
  offset: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/userAccessRequest?offset=${offset}&size=${size}`,
      {
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
        } as any,
        next: { tags: ["getRepositoryInviteRequests"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    console.log("===================== data users ===================", data);
    return data as IServerResult<IAccessRequestResponse>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const getRoles = async (access_token: string) => {
  try {
    const response = await fetch(`${CLASOR}/admin/getRoles`, {
      headers: {
        _token_: access_token,
        _token_issuer_: 1,
        Authorization: "Bearer " + access_token,
      } as any,
      next: { tags: ["getRoles"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<IRoles[]>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const addUserToRepo = async (
  access_token: string,
  repoId: number,
  username: string,
  accessName: string
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/userAccessRequest`,
      {
        method: "POST",
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        body: JSON.stringify({ username, accessName }),
        next: { tags: ["addUserTpRepo"] },
      }
    );
    console.log("----------------- data-------------------", response);
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as any;
  } catch (error) {
    console.log("============ error add user ==========", error);
  }
};

export const editUserRole = async (
  access_token: string,
  repoId: number,
  userName: string,
  roleName: string
) => {
  try {
    const response = await fetch(`${CLASOR}/repositories/${repoId}/acl`, {
      method: "POST",
      headers: {
        _token_: access_token,
        _token_issuer_: 1,
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      } as any,
      body: JSON.stringify({ userName, roleName }),
      next: { tags: ["editUserRole"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as any;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const deleteUser = async (
  access_token: string,
  repoId: number,
  userName: string
) => {
  try {
    const response = await fetch(`${CLASOR}/repositories/${repoId}/acl`, {
      method: "DELETE",
      headers: {
        _token_: access_token,
        _token_issuer_: 1,
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      } as any,
      body: JSON.stringify({ userName }),
      next: { tags: ["deleteUserRole"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as any;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const deleteInviteRequest = async (
  access_token: string,
  repoId: number,
  userId: number
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/userAccessRequest/${userId}`,
      {
        method: "DELETE",
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        next: { tags: ["deleteInviteRequest"] },
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

///////////////////////////// GROUPS ///////////////////////
export const getRepositoryGroups = async (
  access_token: string,
  repoId: number | undefined,
  offset: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/groups/getRepoGroups?offset=${offset}&size=${size}`,
      {
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
        } as any,
        next: { tags: ["getRepositoryGroups"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<IGroupResult>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const getGroupInfo = async (
  access_token: string,
  repoId?: number,
  title?: string
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/groups/${title}`,
      {
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
        } as any,
        next: { tags: ["getGroupInfo"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<IGetGroup>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const createGroup = async (
  access_token: string,
  repoId: number | undefined,
  title: string
) => {
  try {
    const response = await fetch(`${CLASOR}/repositories/${repoId}/groups`, {
      method: "POST",
      headers: {
        _token_: access_token,
        _token_issuer_: 1,
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      } as any,
      body: JSON.stringify({ title }),
      next: { tags: ["createGroup"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<ICreateGroup>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const updateGroup = async (
  access_token: string,
  repoId: number | undefined,
  title: string,
  description?: string,
  members?: string[]
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/groups/${title}`,
      {
        method: "PATCH",
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        body: JSON.stringify({
          title,
          description,
          members,
          memberType: "username",
        }),
        next: { tags: ["updateGroup"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<IUpdateGroup>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const deleteGroup = async (
  access_token: string,
  repoId: number | undefined,
  title: string
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/groups/${title}`,
      {
        method: "DELETE",
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
        } as any,
        next: { tags: ["deleteGroup"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<IUpdateGroup>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

/////////////////////////// TAGS /////////////////////
export const getRepositoryTags = async (
  access_token: string,
  repoId: number | undefined,
  offset: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/tags?offset=${offset}&size=${size}`,
      {
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
        } as any,
        next: { tags: ["getRepositoryTags"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    return data as IServerResult<ITags>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const createTag = async (
  access_token: string,
  repoId: number,
  name: string
) => {
  try {
    const response = await fetch(`${CLASOR}/repositories/${repoId}/tags`, {
      method: "POST",
      headers: {
        _token_: access_token,
        _token_issuer_: 1,
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      } as any,
      body: JSON.stringify({ name: name }),
      next: { tags: ["create-tag"] },
    });
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }

    const data = await response.json();
    return data as any;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const editTag = async (
  access_token: string,
  repoId: number,
  tagId: number,
  name: string
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/tags/${tagId}`,
      {
        method: "PUT",
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        body: JSON.stringify({ name: name }),
        next: { tags: ["editTag"] },
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

export const deleteTag = async (
  access_token: string,
  repoId: number,
  idTag: number
) => {
  try {
    const response = await fetch(
      `${CLASOR}/repositories/${repoId}/tags/${idTag}`,
      {
        method: "DELETE",
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        next: { tags: ["deleteTag"] },
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
  filters?: IChildrenFilter | null,
  forMove?: boolean
) => {
  let finalType = type;

  if (filters?.type.category && filters.type.document) {
    finalType = type;
  } else if (filters?.type.category && !filters.type.document) {
    finalType = "category";
  } else if (!filters?.type.category && filters?.type.document) {
    finalType = "document";
  }
  const params = {
    title: title?.length ? title : undefined,
    type: finalType,
    contentTypes: filters?.contentTypes,
    tagIds: filters?.tagIds,
    bookmarked: filters?.bookmarked,
    isTemplate: filters?.isTemplate,
    withTemplate: !filters?.isTemplate,
  };

  let baseUrl = `${CLASOR}/repositories/${repoId}/categories/getChildren?`;

  // Add filter parameters to the base URL
  if (filters) {
    const filterParams = new URLSearchParams();

    if (filters.title) filterParams.append("title", filters.title);
    if (filters.isTemplate)
      filterParams.append("isTemplate", filters.isTemplate.toString());
    if (filters.contentTypes)
      filterParams.append("contentTypes", filters.contentTypes.join(","));
    if (filters.tagIds) filterParams.append("tagIds", filters.tagIds.join(","));
    if (filters.bookmarked)
      filterParams.append("bookmarked", filters.bookmarked.toString());

    baseUrl += filterParams.toString() + "&";
  }
  try {
    const response = await fetch(
      `${baseUrl}${[
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
        .join("&")}&parentId=${categoryId}&offset=${offset}&size=${size}`,
      {
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        } as any,
        next: { tags: ["getChildren"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    console.log("-------------------- data ------------------", data);
    return data as IServerResult<ICategoryChildren>;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const createCategory = async (
  access_token: string,
  repoId: number | undefined,
  parentId: number | null | undefined,
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
    return data as IServerResult<ICategoryChildren>;
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
    order,
    isTemplate,
    // publicKeyId
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
  try {
    const response = await fetch(
      `${CLASOR}/fileManagement/resource/${resourceId}/userGroup/${userGroupHash}?offset=${offset}&size=${size}&name=${name}&dataType=${dataType}&order=${order}`,
      {
        headers: {
          _token_: access_token,
          _token_issuer_: 1,
          Authorization: "Bearer " + access_token,
        } as any,
        next: { tags: ["getRepositoryFiles"] },
      }
    );
    if (!response.ok) {
      throw new Error("خطا در شبکه");
    }
    const data = await response.json();
    console.log(
      "-----------------------data ----------------------",
      data.data
    );
    return data.data as any;
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
