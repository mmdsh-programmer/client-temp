"use server";

import { createComment, deleteComment, dislike, getCommentList, getDislike, getLike, like } from "@service/clasor";
import { getMe } from "./auth";

export const getCommentListAction = async (
  postId: number,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();

  const response = await getCommentList(
    userInfo.access_token,
    postId,
    offset,
    size
  );

  return response;
};

export const deleteCommentAction = async (
  postId: number,

) => {
  const userInfo = await getMe();

  const response = await deleteComment(
    userInfo.access_token,
    postId,

  );

  return response;
};

export const createCommentAction = async (
  postId: number,
  text: string,
) => {
  const userInfo = await getMe();

  const response = await createComment(
    userInfo.access_token,
    postId,
    text
  );

  return response;
};


export const getLikeAction = async (
  postId: number,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();

  const response = await getLike(
    userInfo.access_token,
    postId,
    offset,
    size
  );

  return response;
};

export const getDislikeAction = async (
  postId: number,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();

  const response = await getDislike(
    userInfo.access_token,
    postId,
    offset,
    size
  );

  return response;
};

export const likeAction = async (
  postId: number,
) => {
  const userInfo = await getMe();

  const response = await like(
    userInfo.access_token,
    postId,
  );

  return response;
};

export const dislikeAction = async (
  postId: number,
) => {
  const userInfo = await getMe();

  const response = await dislike(
    userInfo.access_token,
    postId,
  );

  return response;
};
