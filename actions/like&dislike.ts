"use server";

import {
  dislikeComment,
  dislikePost,
  getCommentDislike,
  getCommentLike,
  getDislikePostList,
  getLikePostList,
  likeComment,
  likePost,
} from "@service/clasor";
import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";

export const getPostLikeListAction = async (postId: number, offset: number, size: number) => {
  const userInfo = await getMe();

  try {
    const accessToken = userInfo.access_token;
    const response = await getLikePostList(accessToken, postId, offset, size);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getPostDislikeListAction = async (postId: number, offset: number, size: number) => {
  const userInfo = await getMe();

  try {
    const accessToken = userInfo.access_token;
    const response = await getDislikePostList(accessToken, postId, offset, size);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const likePostAction = async (postId: number) => {
  const userInfo = await getMe();
  try {
    const response = await likePost(userInfo.access_token, postId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const dislikePostAction = async (postId: number) => {
  const userInfo = await getMe();
  try {
    const response = await dislikePost(userInfo.access_token, postId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getCommentLikeAction = async (commentId: number, offset: number, size: number) => {
  const userInfo = await getMe();
  try {
    const response = await getCommentLike(userInfo.access_token, commentId, offset, size);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getCommentDislikeAction = async (commentId: number, offset: number, size: number) => {
  const userInfo = await getMe();
  try {
    const response = await getCommentDislike(userInfo.access_token, commentId, offset, size);

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
