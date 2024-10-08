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

export const getVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number | undefined,
  state?: "draft" | "version" | "public",
  innerDocument?: boolean,
  innerOutline?: boolean
) => {
  const userInfo = await getMe();

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
};

export const createVersionAction = async (
  repoId: number,
  documentId: number,
  versionNumber: string,
  content: string,
  outline: string
) => {
  const userInfo = await getMe();

  const response = await createVersion(
    userInfo.access_token,
    repoId,
    documentId,
    versionNumber,
    content,
    outline
  );

  return response;
};

export const createFileVersionAction = async (
  repoId: number,
  documentId: number,
  versionNumber: string,
  fileHash?: IFileVersion
) => {
  const userInfo = await getMe();

  const response = await createFileVersion(
    userInfo.access_token,
    repoId,
    documentId,
    versionNumber,
    fileHash
  );

  return response;
};

export const deleteVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number,
  state: string
) => {
  const userInfo = await getMe();

  const response = await deleteVersion(
    userInfo.access_token,
    repoId,
    documentId,
    versionId,
    state
  );

  return response;
};

export const getLastVersionAction = async (
  repoId: number,
  documentId: number
) => {
  const userInfo = await getMe();

  const response = await getLastVersion(
    userInfo.access_token,
    repoId,
    documentId
  );

  return response;
};

export const setLastVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number
) => {
  const userInfo = await getMe();

  const response = await setLastVersion(
    userInfo.access_token,
    repoId,
    documentId,
    versionId
  );

  return response;
};

export const publicVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number
) => {
  const userInfo = await getMe();

  const response = await publicVersion(
    userInfo.access_token,
    repoId,
    documentId,
    versionId
  );

  return response;
};

export const cancelPublicVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number
) => {
  const userInfo = await getMe();

  const response = await cancelPublicVersion(
    userInfo.access_token,
    repoId,
    documentId,
    versionId
  );

  return response;
};

export const confirmVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number
) => {
  const userInfo = await getMe();

  const response = await confirmVersion(
    userInfo.access_token,
    repoId,
    documentId,
    versionId
  );

  return response;
};

export const cancelConfirmVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number
) => {
  const userInfo = await getMe();

  const response = await cancelConfirmVersion(
    userInfo.access_token,
    repoId,
    documentId,
    versionId
  );

  return response;
};
