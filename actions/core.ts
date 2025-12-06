"use server";

import {
  createComment,
  deleteComment,
  dislikeComment,
  getCommentList,
  getDislike,
  getLike,
  likeComment,
} from "@service/clasor";
import { getMe } from "./auth";
import { IActionError } from "@interface/app.interface";
import { normalizeError } from "@utils/normalizeActionError";
import { getPostInfo } from "@service/social";

export const getCommentListAction = async (
  repoId: number,
  docId: number,
  offset: number,
  size: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await getCommentList(userInfo.access_token, repoId, docId, offset, size);

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

export const getLikeAction = async (postId: number, offset: number, size: number) => {
  const userInfo = await getMe();
  try {
    const response = await getLike(userInfo.access_token, postId, offset, size);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getDislikeAction = async (postId: number, offset: number, size: number) => {
  const userInfo = await getMe();
  try {
    const response = await getDislike(userInfo.access_token, postId, offset, size);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getPostInfoAction = async (postId: number) => {
  const userInfo = await getMe();
  try {
    const response = await getPostInfo(userInfo.access_token, postId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const likeCommentAction = async (commentId: number) => {
  const userInfo = await getMe();
  try {
    const response = await likeComment(userInfo.access_token, commentId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const dislikeCommentAction = async (commentId: number) => {
  const userInfo = await getMe();
  try {
    const response = await dislikeComment(userInfo.access_token, commentId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
