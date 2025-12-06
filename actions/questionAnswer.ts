"use server";

import { IActionError } from "@interface/app.interface";
import { normalizeError } from "@utils/normalizeActionError";
import { getMe } from "./auth";
import {
  createAnswer,
  createQuestion,
  deleteAnswer,
  deleteQuestion,
  getAnswerList,
  getQuestionList,
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
