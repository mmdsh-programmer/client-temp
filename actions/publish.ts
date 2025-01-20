"use server";

import {
  confirmComment,
  createComment,
  getPublishCommentList,
} from "@service/social";
import {
  createRepoPublishLink,
  deletePublishLink,
  getAllPublishChildren,
  getPublishChildren,
  getPublishDocumentVersions,
  searchPublishContent,
} from "@service/clasor";
import { getMe, userInfoAction } from "./auth";

import { IActionError } from "@interface/app.interface";
import { headers } from "next/dist/client/components/headers";
import { normalizeError } from "@utils/normalizeActionError";

const { API_TOKEN } = process.env;

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
    const response = await deletePublishLink(
      userInfo.access_token,
      repoId
    );

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
  size: number
) => {
  const userInfo = await userInfoAction();
  try {
    const ssoId =
      userInfo && !("error" in userInfo) ? userInfo.ssoId : undefined;
    const domain = headers().get("host");
    if (!domain) {
      throw new Error("Domain is not found");
    }

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

export const searchPublishContentAction = async (
  repoId: number,
  searchText: string,
  offset: number,
  size: number
) => {
  try {
    const response = await searchPublishContent(
      repoId,
      searchText,
      offset,
      size
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getPublishCommentListAction = async (
  postId: number,
  offset: number,
  size: number
) => {
  const userInfo = await userInfoAction();
  try {
    const accessToken =
      userInfo && !("error" in userInfo)
        ? userInfo.access_token
        : (API_TOKEN as string);

    const response = await getPublishCommentList(
      accessToken,
      postId,
      offset,
      size
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createPublishCommentAction = async (
  postId: number,
  text: string,
  shouldConfirm = true
) => {
  const userInfo = await getMe();
  try {
    const response = await createComment(userInfo.access_token, text, postId);
    if (shouldConfirm) {
      await confirmComment(response.result);
    }

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
