"use server";

import {
  createDocument,
  createDocumentTemplate,
  deleteDocument,
  editDocument,
  getClasorField,
  getDocument,
  getUserDocument,
} from "@service/clasor";
import { getMe } from "./auth";
import { EDocumentTypes } from "@interface/enums";
import { ISortProps } from "@atom/sortParam";
import { IReportFilter } from "@interface/app.interface";

export const getClasorFieldAction = async () => {
  const userInfo = await getMe();
  try {
    const response = await getClasorField(userInfo.access_token);

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const getDocumentAction = async (repoId: number, documentId: number) => {
  const userInfo = await getMe();
  try {
    const response = await getDocument(
      userInfo.access_token,
      repoId,
      documentId
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const createDocumentAction = async (
  repoId: number,
  categoryId: number | null,
  title: string,
  contentType: EDocumentTypes,
  isTemplate: boolean,
  description?: string,
  order?: number,
  imageUrl?: string,
  publicKeyId?: string
) => {
  const userInfo = await getMe();
  try {
    const response = await createDocument(
      userInfo.access_token,
      repoId,
      categoryId,
      title,
      contentType,
      isTemplate,
      description,
      order,
      imageUrl,
      publicKeyId
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const createDocumentTemplateAction = async (
  repoId: number,
  categoryId: number | null,
  title: string,
  contentType: EDocumentTypes,
  versionNumber: string,
  templateId: number,
  description?: string,
  order?: number,
  imageUrl?: string
) => {
  const userInfo = await getMe();
  try {
    const response = await createDocumentTemplate(
      userInfo.access_token,
      repoId,
      categoryId,
      title,
      contentType,
      versionNumber,
      templateId,
      description,
      order,
      imageUrl
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const editDocumentAction = async (
  repoId: number,
  documentId: number,
  categoryId: number | null,
  title: string,
  contentType: EDocumentTypes,
  description?: string,
  order?: number | null,
  isHidden?: boolean,
  tagIds?: number[]
) => {
  const userInfo = await getMe();
  try {
    const response = await editDocument(
      userInfo.access_token,
      repoId,
      documentId,
      categoryId,
      title,
      contentType,
      description,
      order,
      isHidden,
      tagIds
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const deleteDocumentAction = async (
  repoId: number,
  documentId: number
) => {
  const userInfo = await getMe();
  try {
    const response = await deleteDocument(
      userInfo.access_token,
      repoId,
      documentId
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const getUserDocumentAction = async (
  repoId: number,
  sortParams: ISortProps,
  offset: number,
  size: number,
  filters?: IReportFilter | null
) => {
  const userInfo = await getMe();
  try {
    const response = await getUserDocument(
      userInfo.access_token,
      repoId,
      sortParams,
      offset,
      size,
      filters
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};
