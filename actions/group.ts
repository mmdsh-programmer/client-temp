"use server";

import {
  createGroup,
  deleteGroup,
  getGroupInfo,
  getRepositoryGroups,
  updateGroup,
} from "@service/clasor";
import { getMe } from "./auth";

export const getRepositoryGroupsAction = async (
  repoId: number,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();

  const response = await getRepositoryGroups(
    userInfo.access_token,
    repoId,
    offset,
    size
  );

  return response;
};

export const getGroupInfoAction = async (repoId: number, title: string) => {
  const userInfo = await getMe();

  const response = await getGroupInfo(userInfo.access_token, repoId, title);

  return response;
};

export const createGroupAction = async (
  repoId: number,
  title: string,
  description?: string,
  members?: string[]
) => {
  const userInfo = await getMe();

  const response = await createGroup(
    userInfo.access_token,
    repoId,
    title,
    description,
    members
  );
  return response;
};

export const editGroupAction = async (
  repoId: number,
  title: string,
  description?: string,
  members?: string[]
) => {
  const userInfo = await getMe();

  const response = await updateGroup(
    userInfo.access_token,
    repoId,
    title,
    description,
    members
  );

  return response;
};

export const deleteGroupAction = async (repoId: number, title: string) => {
  const userInfo = await getMe();

  const response = await deleteGroup(userInfo.access_token, repoId, title);

  return response;
};
