"use server";

import {
  createTag,
  deleteTag,
  editTag,
  getRepositoryTags,
} from "@service/clasor";
import { getMe } from "./auth";
import { IActionError } from "@interface/app.interface";
import { normalizeError } from "@utils/normalizeActionError";

export const getRepositoryTagAction = async (
  repoId: number,
  isDirectAccess: boolean | undefined,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();

  try {
    const response = await getRepositoryTags(
      userInfo.access_token,
      repoId,
      offset,
      size,
      isDirectAccess
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createTagAction = async (
  repoId: number,
  name: string,
  isDirectAccess?: boolean
) => {
  const userInfo = await getMe();

  try {
    const response = await createTag(
      userInfo.access_token,
      repoId,
      name,
      isDirectAccess
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const editTagAction = async (
  repoId: number,
  tagId: number,
  name: string,
  isDirectAccess?: boolean
) => {
  const userInfo = await getMe();

  try {
    const response = await editTag(
      userInfo.access_token,
      repoId,
      tagId,
      name,
      isDirectAccess
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteTagAction = async (
  repoId: number,
  tagId: number,
  isDirectAccess?: boolean
) => {
  const userInfo = await getMe();

  try {
    const response = await deleteTag(
      userInfo.access_token,
      repoId,
      tagId,
      isDirectAccess
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
