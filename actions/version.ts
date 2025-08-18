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
import { IActionError } from "@interface/app.interface";
import { IFileVersion } from "@interface/version.interface";
import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

export const getVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number | undefined,
  state?: "draft" | "version" | "public",
  innerDocument?: boolean,
  innerOutline?: boolean,
  isDirectAccess?: boolean,
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
      innerOutline,
      isDirectAccess,
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
  outline: string,
  isDirectAccess?: boolean,
) => {
  const userInfo = await getMe();
  try {
    const response = await createVersion(
      userInfo.access_token,
      repoId,
      documentId,
      versionNumber,
      content,
      outline,
      isDirectAccess,
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
  fileHash?: IFileVersion,
  isDirectAccess?: boolean,
) => {
  const userInfo = await getMe();
  try {
    const response = await createFileVersion(
      userInfo.access_token,
      repoId,
      documentId,
      versionNumber,
      fileHash,
      isDirectAccess,
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
  state: string,
  isDirectAccess?: boolean,
) => {
  const userInfo = await getMe();
  try {
    const response = await deleteVersion(
      userInfo.access_token,
      repoId,
      documentId,
      versionId,
      state,
      isDirectAccess,
    );
    // revalidate page of version if exists
    revalidateTag(`vr-${versionId}`);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getLastVersionAction = async (
  repoId: number,
  documentId: number,
  isDirectAccess?: boolean,
) => {
  const userInfo = await getMe();
  try {
    const response = await getLastVersion(
      userInfo.access_token,
      repoId,
      documentId,
      isDirectAccess,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const setLastVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number,
  isDirectAccess?: boolean,
) => {
  const userInfo = await getMe();
  try {
    const response = await setLastVersion(
      userInfo.access_token,
      repoId,
      documentId,
      versionId,
      isDirectAccess,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const publicVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number,
  isDirectAccess?: boolean,
) => {
  const userInfo = await getMe();
  const domain = (await headers()).get("host");
  if (!domain) {
    throw new Error("Domain is not found");
  }

  try {
    const response = await publicVersion(
      userInfo.access_token,
      repoId,
      documentId,
      versionId,
      isDirectAccess,
    );

    // revalidate page of version if exists
    revalidateTag(`vr-${versionId}`);

    // revalidate empty page of document if exists
    revalidateTag(`dc-${documentId}`);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const cancelPublicVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number,
  isDirectAccess?: boolean,
) => {
  const userInfo = await getMe();
  try {
    const response = await cancelPublicVersion(
      userInfo.access_token,
      repoId,
      documentId,
      versionId,
      isDirectAccess,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const confirmVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number,
  isDirectAccess?: boolean,
) => {
  const userInfo = await getMe();
  try {
    const response = await confirmVersion(
      userInfo.access_token,
      repoId,
      documentId,
      versionId,
      isDirectAccess,
    );
    // revalidate page of version if exists
    revalidateTag(`vr-${response.id}`);

    // revalidate empty page of document if exists
    revalidateTag(`dc-${documentId}`);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const cancelConfirmVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number,
  isDirectAccess?: boolean,
) => {
  const userInfo = await getMe();
  try {
    const response = await cancelConfirmVersion(
      userInfo.access_token,
      repoId,
      documentId,
      versionId,
      isDirectAccess,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
