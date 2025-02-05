"use server";

import {
  getBranchList,
  getBranchInfo,
  createRootBranch,
  createSubBranch,
  updateRootBranch,
  updateSubBranch,
  deleteBranch,
} from "@service/clasor";
import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";

export const getAllBranchListAction = async (
  parentId: number | undefined,
  ownerSSOID: number | undefined,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();
  try {
    const response = await getBranchList(
      userInfo.access_token,
      parentId,
      ownerSSOID,
      offset,
      size
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getBranchInfoAction = async (branchId?: number) => {
  const userInfo = await getMe();
  try {
    const response = await getBranchInfo(userInfo.access_token, branchId);
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createRootBranchAction = async (
  name: string,
  repoType: string,
  username: string
) => {
  const userInfo = await getMe();
  try {
    const response = await createRootBranch(
      userInfo.access_token,
      name,
      repoType,
      username
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createSubBranchAction = async (
  branchId: number,
  name: string,
  repoType: string,
  username: string
) => {
  const userInfo = await getMe();
  try {
    const response = await createSubBranch(
      userInfo.access_token,
      branchId,
      name,
      repoType,
      username
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const updateRootBranchAction = async (name: string, username: string) => {
  const userInfo = await getMe();
  try {
    const response = await updateRootBranch(userInfo.access_token, name, username);
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const updateSubBranchAction = async (branchId: number, name: string, username: string) => {
  const userInfo = await getMe();
  try {
    const response = await updateSubBranch(
      userInfo.access_token,
      branchId,
      name,
      username
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteBranchAction = async (branchId: number) => {
  const userInfo = await getMe();
  try {
    const response = await deleteBranch(userInfo.access_token, branchId);
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
