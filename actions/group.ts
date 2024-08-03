"use server";

import {
  addUserToRepo,
  createGroup,
  deleteGroup,
  deleteInviteRequest,
  deleteUser,
  editUserRole,
  getGroupInfo,
  getRepositoryGroups,
  getRepositoryInviteRequestsByOwner,
  getRepositoryUsers,
  getRoles,
  updateGroup,
} from "@service/clasor";
import { getMe } from "./auth";

export const getRepositoryGroupsAction = async (
  repoId: number | undefined,
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
    console.log("============ error ==========", error);
  }
};

export const getGroupInfoAction = async (
  repoId?: number,
  title?: string
) => {
  const userInfo = await getMe();
  try {
    const response = await getGroupInfo(userInfo.access_token, repoId, title);

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const createGroupAction = async (
  repoId: number | undefined,
  title: string
) => {
  const userInfo = await getMe();
  try {
    const response = await createGroup(userInfo.access_token, repoId, title);
    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const editGroupAction = async (
  repoId: number | undefined,
  title: string,
  description?: string,
  members?: string[]
) => {
  const userInfo = await getMe();
  try {
    const response = await updateGroup(
      userInfo.access_token,
      repoId,
      title,
      description,
      members
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const deleteGroupAction = async (
  repoId: number | undefined,
  title: string
) => {
  const userInfo = await getMe();
  try {
    const response = await deleteGroup(userInfo.access_token, repoId, title);

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};
