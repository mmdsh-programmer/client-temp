"use server";

import { dislikePost, getDislikePostList, getLikePostList, likePost } from "@service/clasor";
import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";

export const getLikePostListAction = async (
  postId: number,
  hasUser: boolean,
  offset: number,
  size: number,
) => {
  const userInfo = await getMe();

  try {
    const accessToken = userInfo.access_token;
    const response = await getLikePostList(accessToken, postId, hasUser, offset, size);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getDislikePostListAction = async (
  postId: number,
  hasUser: boolean,
  offset: number,
  size: number,
) => {
  const userInfo = await getMe();

  try {
    const accessToken = userInfo.access_token;
    const response = await getDislikePostList(accessToken, postId, hasUser, offset, size);

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
