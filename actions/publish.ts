"use server";

import { confirmComment, createComment, getPublishCommentList } from "@service/social";
import {
  addToWhiteListRequest,
  createRepoPublishLink,
  deletePublishLink,
  getAllPublishChildren,
  getPublishChildren,
  getPublishDocumentLastVersion,
  getPublishDocumentVersions,
  searchPublishContent,
} from "@service/clasor";
import { getMe, userInfoAction } from "./auth";
import { IActionError } from "@interface/app.interface";
import { getDomainHost } from "@utils/getDomain";
import { normalizeError } from "@utils/normalizeActionError";
import { revalidateTag } from "next/cache";

const { API_TOKEN } = process.env;

export const createRepoPublishLinkAction = async (
  repoId: number,
  expireTime?: number,
  password?: string,
) => {
  const userInfo = await getMe();
  try {
    const response = await createRepoPublishLink(
      userInfo.access_token,
      repoId,
      expireTime,
      password,
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

    // revalidate all links related to repository publish cache if exists
    revalidateTag(`rp-ph-${repoId}`);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getPublishChildrenAction = async (
  repoId: number,
  offset: number,
  size: number,
  categoryId?: number,
) => {
  try {
    const response = await getPublishChildren(repoId, offset, size, categoryId);

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
  title?: string,
) => {
  const userInfo = await userInfoAction();
  try {
    const ssoId = userInfo && !("error" in userInfo) ? userInfo.ssoId : undefined;
    const response = await getAllPublishChildren(repoId, offset, size, title, categoryId, ssoId);

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
    const ssoId = userInfo && !("error" in userInfo) ? userInfo.ssoId : undefined;
    const domain = await getDomainHost();
    if (!domain) {
      throw new Error("Domain is not found");
    }

    const response = await getPublishDocumentVersions(repoId, documentId, offset, size, ssoId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const searchPublishContentAction = async (
  repoId: number | undefined,
  searchText: string,
  offset: number,
  size: number,
) => {
  const domain = await getDomainHost();
  if (!domain) {
    throw new Error("Domain is not found");
  }
  try {
    const response = await searchPublishContent(domain, repoId, searchText, offset, size);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getPublishCommentListAction = async (postId: number, offset: number, size: number) => {
  const userInfo = await userInfoAction();
  try {
    const accessToken =
      userInfo && !("error" in userInfo) ? userInfo.access_token : (API_TOKEN as string);

    const response = await getPublishCommentList(accessToken, postId, offset, size);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createPublishCommentAction = async (
  postId: number,
  text: string,
  shouldConfirm = true,
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

export const addToWhiteListRequestAction = async (repoId: number, docId: number) => {
  const userInfo = await getMe();
  try {
    const response = await addToWhiteListRequest(userInfo.access_token, repoId, docId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getPublishDocumentLastVersionAction = async (
  repoId: number,
  docId: number,
  password?: string,
) => {
  const userInfo = await getMe();
  try {
    const response = await getPublishDocumentLastVersion(
      repoId,
      docId,
      password,
      userInfo.access_token,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
