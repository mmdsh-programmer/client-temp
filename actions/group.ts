"use server";

import {
  createGroup,
  deleteGroup,
  getGroupInfo,
  getRepositoryGroups,
  updateGroup,
} from "@service/clasor";
import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";

export const getRepositoryGroupsAction = async (
  repoId: number,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();
  try {
    const response = await getRepositoryGroups(
      userInfo.access_token,
      repoId,
      offset,
      size
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getGroupInfoAction = async (repoId: number, title: string) => {
  const userInfo = await getMe();
  try {
    const response = await getGroupInfo(userInfo.access_token, repoId, title);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createGroupAction = async (
  repoId: number,
  title: string,
  description?: string,
  members?: string[]
) => {
  const userInfo = await getMe();
  try {
    const response = await createGroup(
      userInfo.access_token,
      repoId,
      title,
      description,
      members
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const editGroupAction = async (
  repoId: number,
  title: string,
  description?: string,
  newTitle?: string,
  members?: string[]
) => {
  const userInfo = await getMe();
  try {
    const response = await updateGroup(
      userInfo.access_token,
      repoId,
      title,
      description,
      newTitle,
      members
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteGroupAction = async (repoId: number, title: string) => {
  const userInfo = await getMe();
  try {
    const response = await deleteGroup(userInfo.access_token, repoId, title);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
