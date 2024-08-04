"use server";

import {
  addUserToRepo,
  deleteInviteRequest,
  deleteUser,
  editUserRole,
  getRepositoryInviteRequestsByOwner,
  getRepositoryUsers,
  getRoles,
} from "@service/clasor";
import { getMe } from "./auth";

export const getRepositoryUserList = async (
  repoId: number | undefined,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();
  try {
    const response = await getRepositoryUsers(
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

export const getRepositoryInviteRequestsAction = async (
  repoId: number | undefined,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();
  try {
    const response = await getRepositoryInviteRequestsByOwner(
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

export const getRolesAction = async () => {
  const userInfo = await getMe();
  try {
    const response = await getRoles(userInfo.access_token);

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const addUserToRepoAction = async (
  repoId: number,
  username: string,
  accessName: string
) => {
  const userInfo = await getMe();
  try {
    const response = await addUserToRepo(
      userInfo.access_token,
      repoId,
      username,
      accessName
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const userRoleEditAction = async (
  repoId: number,
  userName: string,
  roleName: string
) => {
  const userInfo = await getMe();
  try {
    const response = await editUserRole(
      userInfo.access_token,
      repoId,
      userName,
      roleName
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const deleteUserAction = async (repoId: number, userName: string) => {
  const userInfo = await getMe();
  try {
    const response = await deleteUser(userInfo.access_token, repoId, userName);

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const deleteInviteRequestAction = async (
  repoId: number,
  userId: number
) => {
  const userInfo = await getMe();
  try {
    const response = await deleteInviteRequest(
      userInfo.access_token,
      repoId,
      userId
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};
