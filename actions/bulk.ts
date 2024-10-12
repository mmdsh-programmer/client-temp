"use server";

import { deleteBulk, moveBulk } from "@service/clasor";
import { getMe } from "./auth";

export const moveBulkAction = async (
  repoId: number,
  parentId: number | null,
  children: number[]
) => {
  const userInfo = await getMe();

  const response = await moveBulk(
    userInfo.access_token,
    repoId,
    parentId,
    children
  );

  return response;
};

export const deleteBulkAction = async (
  repoId: number,
  children: number[],
  forceDelete?: boolean
) => {
  const userInfo = await getMe();

  const response = await deleteBulk(
    userInfo.access_token,
    repoId,
    children,
    forceDelete
  );

  return response;
};
