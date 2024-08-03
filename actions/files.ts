"use server";

import { deleteFile, editFile, getResourceFiles } from "@service/clasor";
import { getMe } from "./auth";

export const getFileAction = async (
  resourceId: number,
  userGroupHash: string,
  offset: number,
  size: number,
  name?: string,
  order?: string,
  dataType?: string
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
      dataType
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const renameFileAction = async (
  resourceId: number,
  newName: string,
  hash: string
) => {
  const userInfo = await getMe();
  try {
    const response = await editFile(
      userInfo.access_token,
      resourceId,
      newName,
      hash
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const deleteFileAction = async (
  repoId: number,
  resourceId: number,
  fileHash: string,
  type: "private" | "public"
) => {
  const userInfo = await getMe();
  try {
    const response = await deleteFile(
      userInfo.access_token,
      repoId,
      resourceId,
      fileHash,
      type
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};
