"use server";

import { IActionError } from "@interface/app.interface";
import { normalizeError } from "@utils/normalizeActionError";
import { getMe, userInfoAction } from "./auth";
import {
  createComment,
  createPostIdComment,
  deleteComment,
  deletePostIdComment,
  getCommentList,
  getPostIdCommentList,
} from "@service/clasor";

export const getCommentListAction = async (
  repoId: number,
  docId: number,
  offset: number,
  size: number,
) => {
  const userInfo = await userInfoAction();
  const accessToken = userInfo && !("error" in userInfo) ? userInfo.access_token : undefined;
  try {
    const response = await getCommentList(accessToken, repoId, docId, offset, size);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteCommentAction = async (repoId: number, docId: number, commentId: number) => {
  const userInfo = await getMe();
  try {
    const response = await deleteComment(userInfo.access_token, repoId, docId, commentId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createCommentAction = async (repoId: number, docId: number, text: string) => {
  const userInfo = await getMe();
  try {
    const response = await createComment(userInfo.access_token, repoId, docId, text);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getPostIdCommentListAction = async (postId: number, offset: number, size: number) => {
  const userInfo = await getMe();
  try {
    const response = await getPostIdCommentList(userInfo.access_token, postId, offset, size);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createPostIdCommentAction = async (postId: number, text: string) => {
  const userInfo = await getMe();
  try {
    const response = await createPostIdComment(userInfo.access_token, text, postId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deletePostIdCommentAction = async (postId: number) => {
  const userInfo = await getMe();
  try {
    const response = await deletePostIdComment(userInfo.access_token, postId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
