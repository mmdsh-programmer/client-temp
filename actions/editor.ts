"use server";

import {
  createBlockVersion,
  freeDraftVersion,
  saveFileVersion,
  saveVersion,
} from "@service/clasor";
import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";

export const saveVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number,
  versionNumber: string,
  content: string,
  outline: string
) => {
  const userInfo = await getMe();
  try {
    const response = await saveVersion(
      userInfo.access_token,
      repoId,
      documentId,
      versionId,
      versionNumber,
      content,
      outline
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const saveFileVersionAction = async (
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
  const userInfo = await getMe();
  try {
    const response = await saveFileVersion(
      userInfo.access_token,
      repoId,
      documentId,
      versionId,
      versionNumber,
      fileHash
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const freeDraftVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number,
  versionNumber: string,
  content: string,
  outline: string
) => {
  const userInfo = await getMe();
  try {
    const response = await freeDraftVersion(
      userInfo.access_token,
      repoId,
      documentId,
      versionId,
      versionNumber,
      content,
      outline
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createBlockVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number
) => {
  const userInfo = await getMe();
  try {
    const response = await createBlockVersion(
      userInfo.access_token,
      repoId,
      documentId,
      versionId
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
