"use server";

import { IActionError, IReportFilter } from "@interface/app.interface";
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
  getCustomPostByDomain,
  getDocument,
  getDocumentBlocklist,
  getDocumentWhiteBlackList,
  getUserDocument,
  updateDocumentPassword,
} from "@service/clasor";

import { EDocumentTypes } from "@interface/enums";
import { ISortProps } from "@atom/sortParam";
import { getMe } from "./auth";
import { headers } from "next/dist/client/components/headers";
import { normalizeError } from "@utils/normalizeActionError";
import { revalidateTag } from "next/cache";

export const getClasorFieldAction = async () => {
  const userInfo = await getMe();
  try {
    const response = await getClasorField(userInfo.access_token);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getDocumentAction = async (
  repoId: number,
  documentId: number,
  isDirectAccess?: boolean,
  offset?: number,
  size?: number,
  disableVersions?: boolean
) => {
  const userInfo = await getMe();
  try {
    const response = await getDocument(
      userInfo.access_token,
      repoId,
      documentId,
      isDirectAccess,
      offset,
      size,
      disableVersions
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
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
    return normalizeError(error as IActionError);
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
    return normalizeError(error as IActionError);
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
  tagIds?: number[],
  isDirectAccess?: boolean
) => {
  const userInfo = await getMe();
  const domain = headers().get("host");
  if (!domain) {
    throw new Error("Domain is not found");
  }

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
      tagIds,
      isDirectAccess
    );

    // revalidate page of document if exists
    revalidateTag(`dc-${documentId}`);


    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteDocumentAction = async (
  repoId: number,
  documentId: number
) => {
  const userInfo = await getMe();
  const domain = headers().get("host");
  if (!domain) {
    throw new Error("Domain is not found");
  }
  try {
    const response = await deleteDocument(
      userInfo.access_token,
      repoId,
      documentId
    );

    // revalidate page of document if exists
    revalidateTag(`dc-${documentId}`);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getUserDocumentAction = async (
  repoId: number | undefined,
  sortParams: ISortProps,
  offset: number,
  size: number,
  filters: IReportFilter | null | undefined,
  reportType: "myDocuments" | "myAccessDocuments" | null
) => {
  const userInfo = await getMe();
  const domain = headers().get("host");
  if (!domain) {
    throw new Error("Domain is not found");
  }
  const domainInfo = await getCustomPostByDomain(domain);

  try {
    const response = await getUserDocument(
      userInfo.access_token,
      repoId,
      sortParams,
      offset,
      size,
      filters,
      reportType,
      domainInfo.types
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const bookmarkDocumentAction = async (
  repoId: number,
  documentId: number,
  detach?: boolean
) => {
  const userInfo = await getMe();
  try {
    const response = await bookmarkDocument(
      userInfo.access_token,
      repoId,
      documentId,
      detach
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getDocumentBlocklistAction = async (
  repoId: number,
  documentId: number,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();
  try {
    const response = await getDocumentBlocklist(
      userInfo.access_token,
      repoId,
      documentId,
      offset,
      size
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const addUserToDocumentBlocklistAction = async (
  repoId: number,
  documentId: number,
  username: string,
  type: "block" | "unblock"
) => {
  const userInfo = await getMe();
  try {
    const response = await addUserToDocumentBlocklist(
      userInfo.access_token,
      repoId,
      documentId,
      username,
      type
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getDocumentWhiteBlackListAction = async (
  repoId: number,
  documentId: number
) => {
  const userInfo = await getMe();
  try {
    const response = await getDocumentWhiteBlackList(
      userInfo.access_token,
      repoId,
      documentId
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const addToDocumentBlackListAction = async (
  repoId: number,
  documentId: number,
  usernameList: string[]
) => {
  const userInfo = await getMe();
  try {
    const response = await addToDocumentBlackList(
      userInfo.access_token,
      repoId,
      documentId,
      usernameList
    );

    // revalidate page of document if exists
    revalidateTag(`dc-${documentId}`);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const addToDocumentWhiteListAction = async (
  repoId: number,
  documentId: number,
  usernameList: string[]
) => {
  const userInfo = await getMe();
  try {
    const response = await addToDocumentWhiteList(
      userInfo.access_token,
      repoId,
      documentId,
      usernameList
    );

    
    // revalidate page of document if exists
    revalidateTag(`dc-${documentId}`);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createDocumentPasswordAction = async (
  repoId: number,
  documentId: number,
  password: string
) => {
  const userInfo = await getMe();
  try {
    const response = await createDocumentPassword(
      userInfo.access_token,
      repoId,
      documentId,
      password
    );

    // revalidate page of document if exists
    revalidateTag(`dc-${documentId}`);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const updateDocumentPasswordAction = async (
  repoId: number,
  documentId: number,
  oldPassword: string,
  newPassword: string
) => {
  const userInfo = await getMe();
  try {
    const response = await updateDocumentPassword(
      userInfo.access_token,
      repoId,
      documentId,
      oldPassword,
      newPassword
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteDocumentPasswordAction = async (
  repoId: number,
  documentId: number,
  oldPassword: string
) => {
  const userInfo = await getMe();
  try {
    const response = await deleteDocumentPassword(
      userInfo.access_token,
      repoId,
      documentId,
      oldPassword
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const documentEnableUserGroupHashAction = async (
  repoId: number,
  documentId: number,
  isDirectAccess?: boolean
) => {
  const userInfo = await getMe();
  try {
    const response = await documentEnableUserGroupHash(
      userInfo.access_token,
      repoId,
      documentId,
      isDirectAccess
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
