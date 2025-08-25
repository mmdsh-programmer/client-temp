"use server";

import {
  archiveRepository,
  bookmarkRepository,
  createRepo,
  createRepositoryKey,
  deleteRepository,
  deleteRepositoryKey,
  editRepo,
  getAccessRepositories,
  getAllRepositories,
  getBookmarkRepositories,
  getCustomPostByDomain,
  getKey,
  getMyInfo,
  getMyRepositories,
  getPublishRepoList,
  getRepository,
  getRepositoryKeys,
  getRepositorySubscription,
  imageRepository,
  leaveRepository,
  restoreRepository,
  subscribeToRepository,
  transferOwnershipRepository,
  unsubscribeFromRepository,
} from "@service/clasor";
import { IActionError } from "@interface/app.interface";
import { NotFoundError } from "@utils/error";
import { getMe } from "./auth";
import { getDomainHost } from "@utils/getDomain";
import { normalizeError } from "@utils/normalizeActionError";
import { revalidateTag } from "next/dist/server/web/spec-extension/revalidate";

export const getMyInfoAction = async () => {
  const userInfo = await getMe();
  try {
    const domain = await getDomainHost();
    if (!domain) {
      throw new NotFoundError(["دامنه مورد نظر پیدا نشد"]);
    }
    const { types } = await getCustomPostByDomain(domain);

    const response = await getMyInfo(userInfo.access_token, types); // TODO: it should not be array
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getAllRepositoryList = async (offset: number, size: number, name?: string) => {
  const userInfo = await getMe();
  try {
    const domain = await getDomainHost();
    if (!domain) {
      throw new Error("Domain is not found");
    }
    const { types } = await getCustomPostByDomain(domain);
    const response = await getAllRepositories(userInfo.access_token, offset, size, name, types);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getMyRepositoryList = async (
  offset: number,
  size: number,
  archived: boolean,
  name?: string,
  isPublished?: boolean,
) => {
  const userInfo = await getMe();
  try {
    const domain = await getDomainHost();
    if (!domain) {
      throw new Error("Domain is not found");
    }
    const { types } = await getCustomPostByDomain(domain);

    const response = await getMyRepositories(
      userInfo.access_token,
      offset,
      size,
      archived,
      name,
      isPublished,
      types,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getRepositoryAction = async (repoId: number | null) => {
  const userInfo = await getMe();
  try {
    const response = await getRepository(userInfo.access_token, repoId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getAccessRepositoryList = async (offset: number, size: number, name?: string) => {
  const userInfo = await getMe();
  try {
    const domain = await getDomainHost();
    if (!domain) {
      throw new Error("Domain is not found");
    }
    const { types } = await getCustomPostByDomain(domain);

    const response = await getAccessRepositories(userInfo.access_token, offset, size, name, types);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getBookmarkRepositoryList = async (offset: number, size: number, name?: string) => {
  const userInfo = await getMe();
  try {
    const domain = await getDomainHost();
    if (!domain) {
      throw new Error("Domain is not found");
    }
    const { types } = await getCustomPostByDomain(domain);

    const response = await getBookmarkRepositories(
      userInfo.access_token,
      offset,
      size,
      name,
      types,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const editRepoAction = async (repoId: number, name: string, description: string) => {
  const userInfo = await getMe();
  const domain = await getDomainHost();
  if (!domain) {
    throw new Error("Domain is not found");
  }

  try {
    const response = await editRepo(userInfo.access_token, repoId, name, description);

    // revalidate all links related to repository publish cache if exists
    revalidateTag(`rp-ph-${repoId}`);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createRepoAction = async (name: string, description?: string) => {
  const userInfo = await getMe();
  try {
    const domain = await getDomainHost();
    if (!domain) {
      throw new Error("Domain is not found");
    }
    const { types } = await getCustomPostByDomain(domain);

    const response = await createRepo(
      userInfo.access_token,
      name,
      types, // TO_DOO: it should not be array
      description,
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteRepoAction = async (repoId: number) => {
  const userInfo = await getMe();
  const domain = await getDomainHost();
  if (!domain) {
    throw new Error("Domain is not found");
  }
  try {
    const response = await deleteRepository(userInfo.access_token, repoId);

    // revalidate all links related to repository publish cache if exists
    revalidateTag(`rp-ph-${repoId}`);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const archiveRepoAction = async (repoId: number) => {
  const userInfo = await getMe();
  try {
    const response = await archiveRepository(userInfo.access_token, repoId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const restoreRepoAction = async (repoId: number) => {
  const userInfo = await getMe();
  try {
    const response = await restoreRepository(userInfo.access_token, repoId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const leaveRepoAction = async (repoId: number) => {
  const userInfo = await getMe();
  try {
    const response = await leaveRepository(userInfo.access_token, repoId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const bookmarkRepoAction = async (repoId: number, detach?: boolean) => {
  const userInfo = await getMe();
  try {
    const response = await bookmarkRepository(userInfo.access_token, repoId, detach);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const imageRepoAction = async (repoId: number, fileHash: string | null) => {
  const userInfo = await getMe();
  try {
    const response = await imageRepository(userInfo.access_token, repoId, fileHash);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getRepoKeysAction = async (repoId: number, offset: number, size: number) => {
  const userInfo = await getMe();
  try {
    const response = await getRepositoryKeys(userInfo.access_token, repoId, offset, size);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteRepoKeyAction = async (repoId: number, keyId: number) => {
  const userInfo = await getMe();
  try {
    const response = await deleteRepositoryKey(userInfo.access_token, repoId, keyId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createRepoKeyAction = async (repoId: number, name: string, key: string) => {
  const userInfo = await getMe();
  try {
    const response = await createRepositoryKey(userInfo.access_token, repoId, name, key);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getKeyAction = async (repoId: number, keyId: number) => {
  const userInfo = await getMe();
  try {
    const response = await getKey(userInfo.access_token, repoId, keyId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const transferOwnershipRepositoryAction = async (repoId: number, userName: string) => {
  const userInfo = await getMe();
  try {
    const response = await transferOwnershipRepository(userInfo.access_token, repoId, userName);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const subscribeToRepoAction = async (repoId: number, isDirectAccess?: boolean) => {
  const userInfo = await getMe();
  const domain = await getDomainHost();
  if (!domain) {
    throw new Error("Domain is not found");
  }
  try {
    const response = await subscribeToRepository(
      domain,
      userInfo.access_token,
      repoId,
      isDirectAccess,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const unsubscribeFromRepoAction = async (repoId: number, isDirectAccess?: boolean) => {
  const userInfo = await getMe();
  const domain = await getDomainHost();
  if (!domain) {
    throw new Error("Domain is not found");
  }
  try {
    const response = await unsubscribeFromRepository(
      domain,
      userInfo.access_token,
      repoId,
      isDirectAccess,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getRepoSubscriptionAction = async (repoId: number) => {
  const userInfo = await getMe();
  try {
    const response = await getRepositorySubscription(userInfo.access_token, repoId);
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getPublishRepositoriesAction = async (
  offset: number,
  size: number
) => {
  const domain = await getDomainHost();
  if (!domain) {
    throw new Error("Domain is not found");
  }
  const { types } = await getCustomPostByDomain(domain);
  const response = await getPublishRepoList(domain, offset, size, types); // TODO: it should not be array
  return response;
};
