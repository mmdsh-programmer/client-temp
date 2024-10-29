"use server";

import {
  createRepoPublishLink,
  deletePublishLink,
  getAllPublishChildren,
  getPublishChildren,
  getPublishDocumentVersions,
} from "@service/clasor";
import { getMe, userInfoAction } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";

export const createRepoPublishLinkAction = async (
  repoId: number,
  expireTime?: number,
  password?: string
) => {
  const userInfo = await getMe();
  try {
    const response = await createRepoPublishLink(
      userInfo.access_token,
      repoId,
      expireTime,
      password
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deletePublishLinkAction = async (repoId: number) => {
  const userInfo = await getMe();
  try {
    const response = await deletePublishLink(userInfo.access_token, repoId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getPublishChildrenAction = async (
  repoId: number,
  offset: number,
  size: number,
  categoryId?: number
) => {
  const userInfo = await userInfoAction();
  try {
    const ssoId =
      userInfo && !("error" in userInfo) ? userInfo.ssoId : undefined;
    const response = await getPublishChildren(
      repoId,
      offset,
      size,
      categoryId,
      ssoId
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getAllPublishChildrenAction = async (
  repoId: number,
  offset: number,
  size: number,
  categoryId?: number,
  title?: string
) => {
  const userInfo = await userInfoAction();
  try {
    const ssoId =
      userInfo && !("error" in userInfo) ? userInfo.ssoId : undefined;
    const response = await getAllPublishChildren(
      repoId,
      offset,
      size,
      title,
      categoryId,
      ssoId
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getPublishDocumentVersionsAction = async (
  repoId: number,
  documentId: number,
  offset: number,
  size: number,
) => {
  const userInfo = await userInfoAction();
  try {
    const ssoId =
      userInfo && !("error" in userInfo) ? userInfo.ssoId : undefined;
    const response = await getPublishDocumentVersions(
      repoId,
      documentId,
      offset,
      size,
      ssoId
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
