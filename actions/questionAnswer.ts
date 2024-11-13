"use server";
import { IActionError } from "@interface/app.interface";
import {
  archivePost,
  createQuestionAnswer,
  getQuestionAnswer,
  updateQuestionAnswer,
} from "@service/social";
import { normalizeError } from "@utils/normalizeActionError";
import { getMe } from "./auth";

export const getQuestionAnswerAction = async (
  offset: number,
  size: number,
  parentPostId?: number,
  id?: number[],
  uniqueId?: number[],
  userId?: number,
  firstId?: number,
  lastId?: number,
  fromDate?: number,
  toDate?: number,
  tags?: string[],
  tagTrees?: any,
  tagTreeCategoryName?: string[],
  mentionedUserList?: string[],
  activityInfo?: string,
  q?: string,
  relatedToIssuerClient?: string
) => {
  try {
    const response = await getQuestionAnswer(
      offset,
      size,
      parentPostId,
      id,
      uniqueId,
      userId,
      firstId,
      lastId,
      fromDate,
      toDate,
      tags,
      tagTrees,
      tagTreeCategoryName,
      mentionedUserList,
      activityInfo,
      q,
      relatedToIssuerClient
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createQuestionAnswerAction = async (
  name: string,
  content: string,
  repliedPostId?: number,
  metadata?: string,
  replyPostConfirmation?: boolean,
  lgContent?: string,
  lat?: number,
  lng?: number,
  tags?: string[],
  tagTrees?: any,
  tagTreeCategoryName?: string[],
  mentionedUserList?: string[],
  canComment: boolean = true,
  canLike: boolean = true,
  canRate: boolean = true,
  enable: boolean = true
) => {
  const userInfo = await getMe();
  try {
    const response = await createQuestionAnswer(
      userInfo.access_token,
      name,
      content,
      repliedPostId,
      metadata,
      replyPostConfirmation,
      lgContent,
      lat,
      lng,
      tags,
      tagTrees,
      tagTreeCategoryName,
      mentionedUserList,
      canComment,
      canLike,
      canRate,
      enable
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const updateQuestionAnswerAction = async (
  entityId: number,
  name: string,
  content: string,
  repliedPostId?: number,
  metadata?: string,
  canComment?: boolean,
  canLike?: boolean,
  enable?: boolean,
  canRate?: boolean,
  replyPostConfirmation?: boolean,
  lgContent?: string,
  lat?: number,
  lng?: number,
  tags?: string[],
  tagTrees?: any,
  tagTreeCategoryName?: string[],
  mentionedUserList?: string[]
) => {
  const userInfo = await getMe();
  try {
    const response = await updateQuestionAnswer(
      userInfo.access_token,
      entityId,
      name,
      content,
      repliedPostId,
      metadata,
      canComment,
      canLike,
      enable,
      canRate,
      replyPostConfirmation,
      lgContent,
      lat,
      lng,
      tags,
      tagTrees,
      tagTreeCategoryName,
      mentionedUserList
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const delteQuestionAnswerAction = async (postIds: number[]) => {
  const userInfo = await getMe();
  try {
    const response = await archivePost(userInfo.access_token, postIds);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
