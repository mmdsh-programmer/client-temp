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
  getMyInfo,
  getMyRepositories,
  getPublishRepoList,
  getRepository,
  getRepositoryKeys,
  imageRepository,
  leaveRepository,
  restoreRepository,
  transferOwnershipRepository,
} from "@service/clasor";

import { NotFoundError } from "@utils/error";
import { getCustomPostByDomain } from "@service/social";
import { getMe } from "./auth";
import { headers } from "next/headers";

export const getMyInfoAction = async () => {
    const userInfo = await getMe();
    const domain = headers().get("host");
    if (!domain) {
      throw new NotFoundError(["دامنه مورد نظر پیدا نشد"]);
    }
    const { type } = await getCustomPostByDomain(domain);

    const response = await getMyInfo(userInfo.access_token, [type]);
    return response;
};

export const getAllRepositoryList = async (
  offset: number,
  size: number,
  name?: string
) => {
  const userInfo = await getMe();
  const domain = headers().get("host");
  if (!domain) {
    throw new Error("Domain is not found");
  }
  const { type } = await getCustomPostByDomain(domain);
  const response = await getAllRepositories(
    userInfo.access_token,
    offset,
    size,
    name,
    type
  );

  return response;
};

export const getMyRepositoryList = async (
  offset: number,
  size: number,
  archived: boolean,
  name?: string
) => {
  const userInfo = await getMe();
  const domain = headers().get("host");
  if(!domain){
    throw new Error("Domain is not found");
  }
  const { type } = await getCustomPostByDomain(domain);

  const response = await getMyRepositories(
    userInfo.access_token,
    offset,
    size,
    archived,
    name,
    [type]
  );

  return response;
};

export const getRepositoryAction = async (repoId: number | null) => {
  const userInfo = await getMe();

  const response = await getRepository(userInfo.access_token, repoId);

  return response;
};

export const getAccessRepositoryList = async (
  offset: number,
  size: number,
  name?: string
) => {
  const userInfo = await getMe();

  const domain = headers().get("host");
  if(!domain){
    throw new Error("Domain is not found");
  }
  const { type } = await getCustomPostByDomain(domain);

  const response = await getAccessRepositories(
    userInfo.access_token,
    offset,
    size,
    name,
    [type]
  );

  return response;
};

export const getBookmarkRepositoryList = async (
  offset: number,
  size: number,
  name?: string
) => {
  const userInfo = await getMe();
  const domain = headers().get("host");
  if (!domain) {
    throw new Error("Domain is not found");
  }
  const { type } = await getCustomPostByDomain(domain);

  const response = await getBookmarkRepositories(
    userInfo.access_token,
    offset,
    size,
    name,
    [type]
  );

  return response;
};

export const editRepoAction = async (
  repoId: number,
  name: string,
  description: string
) => {
  const userInfo = await getMe();

  const response = await editRepo(
    userInfo.access_token,
    repoId,
    name,
    description
  );

  return response;
};

export const createRepoAction = async (name: string, description?: string) => {
  const userInfo = await getMe();
  const domain = headers().get("host");
  if (!domain) {
    throw new Error("Domain is not found");
  }
  const { type } = await getCustomPostByDomain(domain);

  const response = await createRepo(userInfo.access_token, name, description, [
    type,
  ]);

  return response;
};

export const deleteRepoAction = async (repoId: number) => {
  const userInfo = await getMe();

  const response = await deleteRepository(userInfo.access_token, repoId);

  return response;
};

export const archiveRepoAction = async (repoId: number) => {
  const userInfo = await getMe();

  const response = await archiveRepository(userInfo.access_token, repoId);

  return response;
};

export const restoreRepoAction = async (repoId: number) => {
  const userInfo = await getMe();

  const response = await restoreRepository(userInfo.access_token, repoId);

  return response;
};

export const leaveRepoAction = async (repoId: number) => {
  const userInfo = await getMe();

  const response = await leaveRepository(userInfo.access_token, repoId);

  return response;
};

export const bookmarkRepoAction = async (repoId: number, detach?: boolean) => {
  const userInfo = await getMe();

  const response = await bookmarkRepository(
    userInfo.access_token,
    repoId,
    detach
  );

  return response;
};

export const imageRepoAction = async (
  repoId: number,
  fileHash: string | null
) => {
  const userInfo = await getMe();

  const response = await imageRepository(
    userInfo.access_token,
    repoId,
    fileHash
  );

  return response;
};

export const getRepoKeysAction = async (
  repoId: number,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();

  const response = await getRepositoryKeys(
    userInfo.access_token,
    repoId,
    offset,
    size
  );

  return response;
};

export const deleteRepoKeyAction = async (repoId: number, keyId: number) => {
  const userInfo = await getMe();

  const response = await deleteRepositoryKey(
    userInfo.access_token,
    repoId,
    keyId
  );

  return response;
};

export const createRepoKeyAction = async (
  repoId: number,
  name: string,
  key: string
) => {
  const userInfo = await getMe();

  const response = await createRepositoryKey(
    userInfo.access_token,
    repoId,
    name,
    key
  );

  return response;
};

export const getKeyAction = async (repoId: number, keyId: number) => {
  const userInfo = await getMe();

  const response = await getKey(userInfo.access_token, repoId, keyId);

  return response;
};

export const transferOwnershipRepositoryAction = async (
  repoId: number,
  userName: string
) => {
  const userInfo = await getMe();

  const response = await transferOwnershipRepository(
    userInfo.access_token,
    repoId,
    userName
  );

  return response;
};

export const getPublishRepositoriesAction = async (
  offset: number,
  size: number,
  repoType?: string,
  userssoid?: number,
) => {
  const response = await getPublishRepoList(offset, size, repoType, userssoid);

  return response;
};