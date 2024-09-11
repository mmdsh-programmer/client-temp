"use server";

import { freeDraftVersion, saveVersion } from "@service/clasor";
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
    console.log("============ error ==========", error);
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
    console.log("============ error ==========", error);
  }
};
