"use server";

import {
  createUploadLink,
  deleteFile,
  editFile,
  getPublishAttachment,
  getResourceFiles,
  publicHash,
  repoPublicHashList,
} from "@service/clasor";
import { IActionError } from "@interface/app.interface";
import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";

export const getFileAction = async (
  resourceId: number,
  userGroupHash: string,
  offset: number,
  size: number,
  name?: string,
  order?: "NAME" | "CREATED" | "UPDATED" | "SIZE" | "TYPE" | null,
  isDesc?:boolean
) => {
  const userInfo = await getMe();
  try {
    const response = await getResourceFiles(
      userInfo.access_token,
      resourceId,
      userGroupHash,
      offset,
      size,
      name,
      order,
      isDesc
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const renameFileAction = async (resourceId: number, newName: string, hash: string) => {
  const userInfo = await getMe();
  try {
    const response = await editFile(userInfo.access_token, resourceId, newName, hash);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createUploadLinkAction = async (
  resourceId: number,
  userGroupHash: string,
  isPublic?: boolean,
) => {
  const userInfo = await getMe();
  try {
    const response = await createUploadLink(
      userInfo.access_token,
      resourceId,
      userGroupHash,
      isPublic,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteFileAction = async (
  repoId: number,
  resourceId: number,
  fileHash: string,
  type: "private" | "public",
) => {
  const userInfo = await getMe();
  try {
    const response = await deleteFile(userInfo.access_token, repoId, resourceId, fileHash, type);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const publicHashAction = async (resourceId: number, hash: string) => {
  const userInfo = await getMe();
  try {
    const response = await publicHash(userInfo.access_token, resourceId, hash);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const repoPublicHashAction = async (repoId: number, hashList: string[]) => {
  const userInfo = await getMe();
  try {
    const response = await repoPublicHashList(userInfo.access_token, repoId, hashList);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getPublishAttachmentAction = async (
  docId: number,
  offset: number,
  size: number,
) => {
  try {
    const response = await getPublishAttachment(
      docId,
      offset,
      size,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
