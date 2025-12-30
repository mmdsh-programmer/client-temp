"use server";

import { IActionError } from "@interface/app.interface";
import { normalizeError } from "@utils/normalizeActionError";
import { getMe } from "./auth";
import { createPostIdComment, deletePostIdComment, getPostIdCommentList } from "@service/clasor";

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
