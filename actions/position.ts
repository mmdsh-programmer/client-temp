"use server";

import {
  getPositionOfBranch,
  getPositionInfo,
  setPositionForBranch,
  addMembersToPosition,
  setGrantsForPosition,
  assignPositionForSubBranch,
  updatePosition,
  deleteMembersFromPosition,
} from "@service/clasor";
import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";

export const getPositionListAction = async (
  branchId: number | undefined,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();
  try {
    const response = await getPositionOfBranch(
      userInfo.access_token,
      branchId,
      offset,
      size
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getPositionInfoAction = async (
  branchId: number | undefined,
  positionName: string
) => {
  const userInfo = await getMe();
  try {
    const response = await getPositionInfo(
      userInfo.access_token,
      branchId,
      positionName
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createPositionAction = async (
  branchId: number,
  title: string,
  members: string[]
) => {
  const userInfo = await getMe();
  try {
    const response = await setPositionForBranch(
      userInfo.access_token,
      branchId,
      title,
      members
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const addMembersToPositionAction = async (
  branchId: number,
  positionName: string,
  members: string[]
) => {
  const userInfo = await getMe();
  try {
    const response = await addMembersToPosition(
      userInfo.access_token,
      branchId,
      positionName,
      members
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const setGrantsForPositionAction = async (
  branchId: number,
  positionName: string,
  serviceNames: string[]
) => {
  const userInfo = await getMe();
  try {
    const response = await setGrantsForPosition(
      userInfo.access_token,
      branchId,
      positionName,
      serviceNames
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const assignPositionToSubBranchAction = async (
  branchId: number,
  subBranchId: number,
  positionName: string
) => {
  const userInfo = await getMe();
  try {
    const response = await assignPositionForSubBranch(
      userInfo.access_token,
      branchId,
      subBranchId,
      positionName
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const updatePositionAction = async (
  branchId: number,
  positionName: string,
  title: string,
  members: string[]
) => {
  const userInfo = await getMe();
  try {
    const response = await updatePosition(
      userInfo.access_token,
      branchId,
      positionName,
      title,
      members
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteMembersFromPositionAction = async (
  branchId: number,
  positionName: string,
  members: string[]
) => {
  const userInfo = await getMe();
  try {
    const response = await deleteMembersFromPosition(
      userInfo.access_token,
      branchId,
      positionName,
      members
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
