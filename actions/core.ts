"use server";

import {
  createComment,
  deleteComment,
  getCommentList,
  getDislike,
  getLike,
} from "@service/clasor";
import { getMe } from "./auth";
import { IActionError } from "@interface/app.interface";
import { normalizeError } from "@utils/normalizeActionError";
import {
  dislikeComment,
  getPostInfo,
  likeComment,
  likePost,
} from "@service/social";

export const getCommentListAction = async (
  postId: number,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();
  try {
    const response = await getCommentList(
      userInfo.access_token,
      postId,
      offset,
      size
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteCommentAction = async (postId: number) => {
  const userInfo = await getMe();
  try {
    const response = await deleteComment(userInfo.access_token, postId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createCommentAction = async (postId: number, text: string) => {
  const userInfo = await getMe();
  try {
    const response = await createComment(userInfo.access_token, postId, text);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getLikeAction = async (
  postId: number,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();
  try {
    const response = await getLike(userInfo.access_token, postId, offset, size);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getDislikeAction = async (
  postId: number,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();
  try {
    const response = await getDislike(
      userInfo.access_token,
      postId,
      offset,
      size
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const likeAction = async (postId: number, like: boolean) => {
  const userInfo = await getMe();
  try {
    const response = await likePost(userInfo.access_token, postId, like);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const dislikeAction = async (postId: number, dislike: boolean) => {
  const userInfo = await getMe();
  try {
    const response = await likePost(
      userInfo.access_token,
      postId,
      undefined,
      dislike
    );

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

export const likeCommentAction = async (
  commentId: number,
  dislike: boolean
) => {
  const userInfo = await getMe();
  try {
    const response = await likeComment(
      userInfo.access_token,
      commentId,
      dislike
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const dislikeCommentAction = async (
  commentId: number,
  dislike: boolean
) => {
  const userInfo = await getMe();
  try {
    const response = await dislikeComment(
      userInfo.access_token,
      commentId,
      dislike
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
