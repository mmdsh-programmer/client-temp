"use server";

import { IActionError } from "@interface/app.interface";
import { normalizeError } from "@utils/normalizeActionError";
import { getMe } from "./auth";
import {
  confirmAnswerByAdmin,
  confirmCommentByAdmin,
  confirmQuestionByAdmin,
  createAnswer,
  createQuestion,
  deleteAnswer,
  deleteAnswerByAdmin,
  deleteQuestion,
  deleteQuestionByAdmin,
  getAnswerList,
  getAnswerListByAdmin,
  getCommentListByAdmin,
  getQuestionList,
  getQuestionListByAdmin,
  rejectAnswerByAdmin,
  rejectCommentByAdmin,
  rejectQuestionByAdmin,
  updateAnswer,
  updateQuestion,
} from "@service/clasor";

export const getQuestionListAction = async (
  repoId: number,
  documentId: number,
  offset: number,
  size: number,
) => {
  const userInfo = await getMe();

  try {
    const accessToken = userInfo.access_token;
    const response = await getQuestionList(accessToken, repoId, documentId, offset, size);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createQuestionAction = async (
  repoId: number,
  documentId: number,
  title: string,
  content: string,
) => {
  const userInfo = await getMe();
  try {
    const response = await createQuestion(
      userInfo.access_token,
      repoId,
      documentId,
      title,
      content,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const updateQuestionAction = async (
  repoId: number,
  documentId: number,
  entityId: number,
  title: string,
  content: string,
) => {
  const userInfo = await getMe();
  try {
    const response = await updateQuestion(
      userInfo.access_token,
      repoId,
      documentId,
      entityId,
      title,
      content,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteQuestionAction = async (
  repoId: number,
  documentId: number,
  entityId: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await deleteQuestion(userInfo.access_token, repoId, documentId, entityId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getAnswerListAction = async (
  repoId: number,
  documentId: number,
  questionId: number,
  offset: number,
  size: number,
) => {
  const userInfo = await getMe();

  try {
    const accessToken = userInfo.access_token;
    const response = await getAnswerList(accessToken, repoId, documentId, questionId, offset, size);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createAnswerAction = async (
  repoId: number,
  documentId: number,
  questionId: number,
  title: string,
  content: string,
) => {
  const userInfo = await getMe();
  try {
    const response = await createAnswer(
      userInfo.access_token,
      repoId,
      documentId,
      questionId,
      title,
      content,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const updateAnswerAction = async (
  repoId: number,
  documentId: number,
  entityId: number,
  title: string,
  content: string,
) => {
  const userInfo = await getMe();
  try {
    const response = await updateAnswer(
      userInfo.access_token,
      repoId,
      documentId,
      entityId,
      title,
      content,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteAnswerAction = async (repoId: number, documentId: number, entityId: number) => {
  const userInfo = await getMe();
  try {
    const response = await deleteAnswer(userInfo.access_token, repoId, documentId, entityId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getQuestionListByAdminAction = async (
  repoId: number,
  documentId: number,
  enable: boolean,
  offset: number,
  size: number,
) => {
  const userInfo = await getMe();

  try {
    const accessToken = userInfo.access_token;
    const response = await getQuestionListByAdmin(
      accessToken,
      repoId,
      documentId,
      enable,
      offset,
      size,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const confirmQuestionByAdminAction = async (
  repoId: number,
  documentId: number,
  questionId: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await confirmQuestionByAdmin(
      userInfo.access_token,
      repoId,
      documentId,
      questionId,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const rejectQuestionByAdminAction = async (
  repoId: number,
  documentId: number,
  questionId: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await rejectQuestionByAdmin(
      userInfo.access_token,
      repoId,
      documentId,
      questionId,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteQuestionByAdminAction = async (
  repoId: number,
  documentId: number,
  questionId: number,
  postIds: number[],
) => {
  const userInfo = await getMe();
  try {
    const response = await deleteQuestionByAdmin(
      userInfo.access_token,
      repoId,
      documentId,
      questionId,
      postIds,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getAnswerListByAdminAction = async (
  repoId: number,
  documentId: number,
  questionId: number,
  offset: number,
  size: number,
) => {
  const userInfo = await getMe();

  try {
    const accessToken = userInfo.access_token;
    const response = await getAnswerListByAdmin(
      accessToken,
      repoId,
      documentId,
      questionId,
      offset,
      size,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const confirmAnswerByAdminAction = async (
  repoId: number,
  documentId: number,
  entityId: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await confirmAnswerByAdmin(
      userInfo.access_token,
      repoId,
      documentId,
      entityId,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const rejectAnswerByAdminAction = async (
  repoId: number,
  documentId: number,
  entityId: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await rejectAnswerByAdmin(userInfo.access_token, repoId, documentId, entityId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteAnswerByAdminAction = async (
  repoId: number,
  documentId: number,
  postIds: number[],
) => {
  const userInfo = await getMe();
  try {
    const response = await deleteAnswerByAdmin(userInfo.access_token, repoId, documentId, postIds);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getCommentListByAdminAction = async (
  repoId: number,
  documentId: number,
  offset: number,
  size: number,
) => {
  const userInfo = await getMe();

  try {
    const accessToken = userInfo.access_token;
    const response = await getCommentListByAdmin(accessToken, repoId, documentId, offset, size);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const confirmCommentByAdminAction = async (
  repoId: number,
  documentId: number,
  commentId: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await confirmCommentByAdmin(
      userInfo.access_token,
      repoId,
      documentId,
      commentId,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const rejectCommentByAdminAction = async (
  repoId: number,
  documentId: number,
  commentId: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await rejectCommentByAdmin(
      userInfo.access_token,
      repoId,
      documentId,
      commentId,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
