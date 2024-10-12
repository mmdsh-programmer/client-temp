"use server";

import {
  addToDocumentBlackList,
  addToDocumentWhiteList,
  addUserToDocumentBlocklist,
  bookmarkDocument,
  createDocument,
  createDocumentPassword,
  createDocumentTemplate,
  deleteDocument,
  deleteDocumentPassword,
  documentEnableUserGroupHash,
  editDocument,
  getClasorField,
  getDocument,
  getDocumentBlocklist,
  getDocumentWhiteBlackList,
  getUserDocument,
  updateDocumentPassword,
} from "@service/clasor";
import { getMe } from "./auth";
import { EDocumentTypes } from "@interface/enums";
import { ISortProps } from "@atom/sortParam";
import { IReportFilter } from "@interface/app.interface";

export const getClasorFieldAction = async () => {
  const userInfo = await getMe();

  const response = await getClasorField(userInfo.access_token);

  return response;
};

export const getDocumentAction = async (
  repoId: number,
  documentId: number,
  offset?: number,
  size?: number
) => {
  const userInfo = await getMe();

  const response = await getDocument(
    userInfo.access_token,
    repoId,
    documentId,
    offset,
    size
  );

  return response;
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
};

export const deleteDocumentAction = async (
  repoId: number,
  documentId: number
) => {
  const userInfo = await getMe();

  const response = await deleteDocument(
    userInfo.access_token,
    repoId,
    documentId
  );

  return response;
};

export const getUserDocumentAction = async (
  repoId: number,
  sortParams: ISortProps,
  offset: number,
  size: number,
  filters?: IReportFilter | null
) => {
  const userInfo = await getMe();

  const response = await getUserDocument(
    userInfo.access_token,
    repoId,
    sortParams,
    offset,
    size,
    filters
  );

  return response;
};

export const bookmarkDocumentAction = async (
  repoId: number,
  documentId: number,
  detach?: boolean
) => {
  const userInfo = await getMe();

  const response = await bookmarkDocument(
    userInfo.access_token,
    repoId,
    documentId,
    detach
  );

  return response;
};

export const getDocumentBlocklistAction = async (
  repoId: number,
  documentId: number,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();

  const response = await getDocumentBlocklist(
    userInfo.access_token,
    repoId,
    documentId,
    offset,
    size
  );

  return response;
};

export const addUserToDocumentBlocklistAction = async (
  repoId: number,
  documentId: number,
  username: string,
  type: "block" | "unblock"
) => {
  const userInfo = await getMe();

  const response = await addUserToDocumentBlocklist(
    userInfo.access_token,
    repoId,
    documentId,
    username,
    type
  );

  return response;
};

export const getDocumentWhiteBlackListAction = async (
  repoId: number,
  documentId: number
) => {
  const userInfo = await getMe();

  const response = await getDocumentWhiteBlackList(
    userInfo.access_token,
    repoId,
    documentId
  );

  return response;
};

export const addToDocumentBlackListAction = async (
  repoId: number,
  documentId: number,
  usernameList: string[]
) => {
  const userInfo = await getMe();

  const response = await addToDocumentBlackList(
    userInfo.access_token,
    repoId,
    documentId,
    usernameList
  );

  return response;
};

export const addToDocumentWhiteListAction = async (
  repoId: number,
  documentId: number,
  usernameList: string[]
) => {
  const userInfo = await getMe();

  const response = await addToDocumentWhiteList(
    userInfo.access_token,
    repoId,
    documentId,
    usernameList
  );

  return response;
};

export const createDocumentPasswordAction = async (
  repoId: number,
  documentId: number,
  password: string
) => {
  const userInfo = await getMe();

  const response = await createDocumentPassword(
    userInfo.access_token,
    repoId,
    documentId,
    password
  );

  return response;
};

export const updateDocumentPasswordAction = async (
  repoId: number,
  documentId: number,
  oldPassword: string,
  newPassword: string
) => {
  const userInfo = await getMe();

  const response = await updateDocumentPassword(
    userInfo.access_token,
    repoId,
    documentId,
    oldPassword,
    newPassword
  );

  return response;
};

export const deleteDocumentPasswordAction = async (
  repoId: number,
  documentId: number,
  oldPassword: string
) => {
  const userInfo = await getMe();

  const response = await deleteDocumentPassword(
    userInfo.access_token,
    repoId,
    documentId,
    oldPassword
  );

  return response;
};

export const documentEnableUserGroupHashAction = async (
  repoId: number,
  documentId: number
) => {
  const userInfo = await getMe();
  const response = await documentEnableUserGroupHash(
    userInfo.access_token,
    repoId,
    documentId
  );

  return response;
};
