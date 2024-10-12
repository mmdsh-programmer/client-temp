"use server";

import {
  createBlockVersion,
  freeDraftVersion,
  saveVersion,
} from "@service/clasor";
import { getMe } from "./auth";

export const saveVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number,
  versionNumber: string,
  content: string,
  outline: string
) => {
  const userInfo = await getMe();

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
};

export const createBlockVersionAction = async (
  repoId: number,
  documentId: number,
  versionId: number
) => {
  const userInfo = await getMe();

  const response = await createBlockVersion(
    userInfo.access_token,
    repoId,
    documentId,
    versionId
  );

  return response;
};
