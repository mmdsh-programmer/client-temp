"use server";

import { IActionError, IChildrenFilter } from "@interface/app.interface";
import {
  addUserToCategoryBlocklist,
  createCategory,
  deleteCategory,
  editCategory,
  getCategory,
  getCategoryBlocklist,
  getChildren,
} from "@service/clasor";
import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";
import { revalidateTag } from "next/cache";
import { ISortProps } from "@store/sortParam";

export const getChildrenAction = async (
  repoId: number,
  categoryId: number | undefined | null,
  sortParams: ISortProps,
  offset: number,
  size: number,
  title?: string | null,
  type?: "category" | "document",
  filters?: IChildrenFilter | null
) => {
  const userInfo = await getMe();
  try {
    const response = await getChildren(
      userInfo.access_token,
      repoId,
      categoryId,
      sortParams,
      offset,
      size,
      title,
      type,
      filters
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getCategoryAction = async (repoId: number, categoryId: number) => {
  const userInfo = await getMe();
  try {
    const response = await getCategory(
      userInfo.access_token,
      repoId,
      categoryId
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const editCategoryAction = async (
  repoId: number,
  categoryId: number | null,
  parentId: number | null,
  name: string,
  description: string | undefined,
  order: number | null,
  isHidden: boolean
) => {
  const userInfo = await getMe();
  try {
    const response = await editCategory(
      userInfo.access_token,
      repoId,
      categoryId,
      parentId,
      name,
      description,
      order,
      isHidden
    );

    if (isHidden) {
      // revalidate repository publish cache if exists
      revalidateTag(`rp-ph-${repoId}`);
    }

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createCategoryAction = async (
  repoId: number,
  parentId: number | null,
  name: string,
  description: string,
  order: number | null
) => {
  const userInfo = await getMe();
  try {
    const response = await createCategory(
      userInfo.access_token,
      repoId,
      parentId,
      name,
      description,
      order
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteCategoryAction = async (
  repoId: number,
  categoryId: number,
  forceDelete: boolean
) => {
  const userInfo = await getMe();
  try {
    const response = await deleteCategory(
      userInfo.access_token,
      repoId,
      categoryId,
      forceDelete
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getCategoryBlocklistAction = async (
  repoId: number,
  categoryId: number,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();
  try {
    const response = await getCategoryBlocklist(
      userInfo.access_token,
      repoId,
      categoryId,
      offset,
      size
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const addUserToCategoryBlocklistAction = async (
  repoId: number,
  categoryId: number,
  username: string,
  type: "block" | "unblock"
) => {
  const userInfo = await getMe();
  try {
    const response = await addUserToCategoryBlocklist(
      userInfo.access_token,
      repoId,
      categoryId,
      username,
      type
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
