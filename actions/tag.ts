"use server";

import {
  createTag,
  deleteTag,
  editTag,
  getRepositoryTags,
} from "@service/clasor";
import { getMe } from "./auth";

export const getRepositoryTagAction = async (
  repoId: number,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();

  const response = await getRepositoryTags(
    userInfo.access_token,
    repoId,
    offset,
    size
  );

  return response;
};

export const createTagAction = async (repoId: number, name: string) => {
  const userInfo = await getMe();

  const response = await createTag(userInfo.access_token, repoId, name);

  return response;
};

export const editTagAction = async (
  repoId: number,
  tagId: number,
  name: string
) => {
  const userInfo = await getMe();

  const response = await editTag(userInfo.access_token, repoId, tagId, name);

  return response;
};

export const deleteTagAction = async (repoId: number, tagId: number) => {
  const userInfo = await getMe();

  const response = await deleteTag(userInfo.access_token, repoId, tagId);

  return response;
};
