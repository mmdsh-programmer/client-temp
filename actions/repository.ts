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
  getKey,
  getMyRepositories,
  getRepository,
  getRepositoryKeys,
  imageRepository,
  leaveRepository,
  restoreRepository,
  transferOwnershipRepository,
} from "@service/clasor";
import { getMe } from "./auth";
import { handleActionError } from "@utils/error";
import { IActionError } from "@interface/app.interface";

export const getAllRepositoryList = async (
  offset: number,
  size: number,
  name?: string,
) => {
  const userInfo = await getMe();
  try {
    const response = await getAllRepositories(
      userInfo.access_token,
      offset,
      size,
      name,
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const getMyRepositoryList = async (
  offset: number,
  size: number,
  archived: boolean,
  name?: string,
) => {
  const userInfo = await getMe();
  try {
    const response = await getMyRepositories(
      userInfo.access_token,
      offset,
      size,
      archived,
      name,
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const getRepositoryAction = async (repoId: number | null) => {
  const userInfo = await getMe();
  try {
    const response = await getRepository(userInfo.access_token, repoId);

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const getAccessRepositoryList = async (
  offset: number,
  size: number,
  name?: string,
) => {
  const userInfo = await getMe();
  try {
    const response = await getAccessRepositories(
      userInfo.access_token,
      offset,
      size,
      name,
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const getBookmarkRepositoryList = async (
  offset: number,
  size: number,
  name?: string,
) => {
  const userInfo = await getMe();
  try {
    const response = await getBookmarkRepositories(
      userInfo.access_token,
      offset,
      size,
      name,
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const editRepoAction = async (
  repoId: number,
  name: string,
  description: string,
) => {
  const userInfo = await getMe();
  try {
    const response = await editRepo(
      userInfo.access_token,
      repoId,
      name,
      description,
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const createRepoAction = async (name: string, description?: string) => {
  const userInfo = await getMe();
  try {
    const response = await createRepo(userInfo.access_token, name, description);

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const deleteRepoAction = async (repoId: number) => {
  const userInfo = await getMe();
  try {
    const response = await deleteRepository(userInfo.access_token, repoId);

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const archiveRepoAction = async (repoId: number) => {
  const userInfo = await getMe();
  try {
    const response = await archiveRepository(userInfo.access_token, repoId);

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const restoreRepoAction = async (repoId: number) => {
  const userInfo = await getMe();
  try {
    const response = await restoreRepository(userInfo.access_token, repoId);

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const leaveRepoAction = async (repoId: number) => {
  const userInfo = await getMe();
  try {
    const response = await leaveRepository(userInfo.access_token, repoId);

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const bookmarkRepoAction = async (repoId: number, detach?: boolean) => {
  const userInfo = await getMe();
  try {
    const response = await bookmarkRepository(
      userInfo.access_token,
      repoId,
      detach,
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const imageRepoAction = async (
  repoId: number,
  fileHash: string | null,
) => {
  const userInfo = await getMe();
  try {
    const response = await imageRepository(
      userInfo.access_token,
      repoId,
      fileHash,
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const getRepoKeysAction = async (
  repoId: number,
  offset: number,
  size: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await getRepositoryKeys(
      userInfo.access_token,
      repoId,
      offset,
      size,
    );

    return response;
  } catch (error) {
    return handleActionError(error as IActionError);
  }
};

export const deleteRepoKeyAction = async (repoId: number, keyId: number) => {
  const userInfo = await getMe();
  try {
    const response = await deleteRepositoryKey(
      userInfo.access_token,
      repoId,
      keyId,
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const createRepoKeyAction = async (
  repoId: number,
  name: string,
  key: string,
) => {
  const userInfo = await getMe();
  try {
    const response = await createRepositoryKey(
      userInfo.access_token,
      repoId,
      name,
      key,
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const getKeyAction = async (
  repoId: number,
  keyId: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await getKey(
      userInfo.access_token,
      repoId,
      keyId,
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const transferOwnershipRepositoryAction = async (repoId: number, userName: string) => {
  const userInfo = await getMe();
  try {
    const response = await transferOwnershipRepository(
      userInfo.access_token,
      repoId,
      userName,
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};
