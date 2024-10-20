"use server";

import {
  cancelConfirmVersion,
  cancelPublicVersion,
  confirmVersion,
  createFileVersion,
  createVersion,
  deleteVersion,
  getLastVersion,
  getVersion,
  publicVersion,
  setLastVersion,
} from "@service/clasor";
import { getMe } from "./auth";
import { IFileVersion } from "@interface/version.interface";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";

export const getVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number | undefined,
  state?: "draft" | "version" | "public",
  innerDocument?: boolean,
  innerOutline?: boolean
) => {
  const userInfo = await getMe();
  try {
    const response = await getVersion(
      userInfo.access_token,
      repoId,
      documentId,
      versionId,
      state,
      innerDocument,
      innerOutline
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createVersionAction = async (
  repoId: number,
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
    return normalizeError(error as IActionError);
  }
};

export const createFileVersionAction = async (
  repoId: number,
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
    return normalizeError(error as IActionError);
  }
};

export const deleteVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number,
  state: string
) => {
  const userInfo = await getMe();
  try {
    const response = await deleteVersion(
      userInfo.access_token,
      repoId,
      documentId,
      versionId,
      state
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getLastVersionAction = async (
  repoId: number,
  documentId: number
) => {
  const userInfo = await getMe();
  try {
    const response = await getLastVersion(
      userInfo.access_token,
      repoId,
      documentId
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const setLastVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number
) => {
  const userInfo = await getMe();
  try {
    const response = await setLastVersion(
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

export const publicVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number
) => {
  const userInfo = await getMe();
  try {
    const response = await publicVersion(
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

export const cancelPublicVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number
) => {
  const userInfo = await getMe();
  try {
    const response = await cancelPublicVersion(
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

export const confirmVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number
) => {
  const userInfo = await getMe();
  try {
    const response = await confirmVersion(
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

export const cancelConfirmVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number
) => {
  const userInfo = await getMe();
  try {
    const response = await cancelConfirmVersion(
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
