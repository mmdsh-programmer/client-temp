"use server";

import { IActionError } from "@interface/app.interface";
import {
  collaborateFormVersion,
  createFormVersion,
  getFormVersionExport,
  getResponseListFormVersion,
} from "@service/clasor";
import { normalizeError } from "@utils/normalizeActionError";
import { getMe } from "./auth";

export const createFormVersionAction = async (
  repoId: number,
  documentId: number,
  versionNumber: string,
  isDirectAccess?: boolean,
) => {
  const userInfo = await getMe();
  try {
    const response = await createFormVersion(
      userInfo.access_token,
      repoId,
      documentId,
      versionNumber,
      isDirectAccess,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getFormVersionExportAction = async (
  repoId: number,
  documentId: number,
  versionId: number,
  fileType: "XLSX" | "CSV",
) => {
  const userInfo = await getMe();
  try {
    const response = await getFormVersionExport(
      userInfo.access_token,
      repoId,
      documentId,
      versionId,
      fileType,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const collaborateFormVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await collaborateFormVersion(
      userInfo.access_token,
      repoId,
      documentId,
      versionId,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getResponseListFormVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number,
  offset: number,
  size: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await getResponseListFormVersion(
      userInfo.access_token,
      repoId,
      documentId,
      versionId,
      offset,
      size,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
