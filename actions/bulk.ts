"use server";

import { deleteBulk, moveBulk } from "@service/clasor";
import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";

export const moveBulkAction = async (
  repoId: number,
  parentId: number | null,
  children: number[]
) => {
  const userInfo = await getMe();
  try {
    const response = await moveBulk(
      userInfo.access_token,
      repoId,
      parentId,
      children
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteBulkAction = async (
  repoId: number,
  children: number[],
  forceDelete?: boolean
) => {
  const userInfo = await getMe();
  try {
    const response = await deleteBulk(
      userInfo.access_token,
      repoId,
      children,
      forceDelete
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
