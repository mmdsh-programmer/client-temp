"use server";

import {
  createCategory,
  deleteCategory,
  editCategory,
  getChildren,
} from "@service/clasor";
import { getMe } from "./auth";
import { ISortProps } from "@atom/sortParam";
import { IChildrenFilter } from "@interface/app.interface";

export const getChildrenAction = async (
  repoId: number | undefined,
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
    console.log("============ error ==========", error);
  }
};

export const editCategoryAction = async (
  repoId: number | undefined,
  categoryId: number | undefined | null,
  name: string,
  description: string,
  order: number | null,
  isHidden: boolean
) => {
  const userInfo = await getMe();
  try {
    const response = await editCategory(
      userInfo.access_token,
      repoId,
      categoryId,
      name,
      description,
      order,
      isHidden
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const createCategoryAction = async (
  repoId: number | undefined,
  parentId: number | undefined | null,
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
    console.log("============ error ==========", error);
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
    console.log("============ error ==========", error);
  }
};
