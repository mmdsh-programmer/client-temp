"use server";

import { createFileVersion, createVersion } from "@service/clasor";
import { getMe } from "./auth";
import { IFileVersion } from "@interface/version.interface";

export const createVersionAction = async (
  repoId: number | undefined,
  documentId: number,
  versionNumber: string,
  content: string,
  outline: string
) => {
  const userInfo = await getMe();
  try {
    const response = await createVersion(
      userInfo.access_token,
      repoId,
      documentId,
      versionNumber,
      content,
      outline
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const createFileVersionAction = async (
  repoId: number | undefined,
  documentId: number,
  versionNumber: string,
  fileHash?: IFileVersion
) => {
  const userInfo = await getMe();
  try {
    const response = await createFileVersion(
      userInfo.access_token,
      repoId,
      documentId,
      versionNumber,
      fileHash
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};
