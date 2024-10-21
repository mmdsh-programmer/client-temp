"use server";

import {
  createComment,
  deleteComment,
  dislike,
  getCommentList,
  getDislike,
  getLike,
  like,
} from "@service/clasor";
import { getMe } from "./auth";
import { IActionError } from "@interface/app.interface";
import { normalizeError } from "@utils/normalizeActionError";

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

export const likeAction = async (postId: number) => {
  const userInfo = await getMe();
  try {
    const response = await like(userInfo.access_token, postId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const dislikeAction = async (postId: number) => {
  const userInfo = await getMe();
  try {
    const response = await dislike(userInfo.access_token, postId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
