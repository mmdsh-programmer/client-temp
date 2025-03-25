"use server";

import {
  getDomainPublishRepoList,
  createDomainTag,
  getAllDomainTags,
  getDomainTagById,
  updateDomainTag,
  deleteDomainTag,
  setDocumentDomainTags,
  getCustomPostByDomain,
  addPartyToDomainParticipants,
  removePartyFromDomainParticipants
} from "@service/clasor";
import { getMe } from "./auth";
import { headers } from "next/headers";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";

export const getCustomPostByDomainAction = async () => {
  try {
    const domain = headers().get("host");

    if (!domain) {
      throw new Error("Domain is not found");
    }
    const response = await getCustomPostByDomain(domain);
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getDomainPublishRepositoriesAction = async (
  offset: number,
  size: number
) => {
  try {
    const userInfo = await getMe();

    const domain = headers().get("host");
    if (!domain) {
      throw new Error("Domain is not found");
    }
    const response = await getDomainPublishRepoList(
      userInfo.access_token,
      domain,
      offset,
      size
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createDomainTagAction = async (
  name: string,
  description: string,
  order: number
) => {
  try {
    const userInfo = await getMe();
    const domain = headers().get("host");

    if (!domain) {
      throw new Error("Domain is not found");
    }

    const response = await createDomainTag(
      domain,
      userInfo.access_token,
      name,
      description,
      order
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getAllDomainTagsAction = async (offset: number, size: number) => {
  try {
    const userInfo = await getMe();
    const domain = headers().get("host");

    if (!domain) {
      throw new Error("Domain is not found");
    }

    const response = await getAllDomainTags(
      domain,
      userInfo.access_token,
      offset,
      size
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getDomainTagByIdAction = async (tagId: number) => {
  try {
    const userInfo = await getMe();
    const domain = headers().get("host");

    if (!domain) {
      throw new Error("Domain is not found");
    }

    const response = await getDomainTagById(
      domain,
      userInfo.access_token,
      tagId
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const updateDomainTagAction = async (
  tagId: number,
  name?: string,
  description?: string
) => {
  try {
    const userInfo = await getMe();
    const domain = headers().get("host");

    if (!domain) {
      throw new Error("Domain is not found");
    }

    const response = await updateDomainTag(
      domain,
      userInfo.access_token,
      tagId,
      name,
      description
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteDomainTagAction = async (tagId: number) => {
  try {
    const userInfo = await getMe();
    const domain = headers().get("host");

    if (!domain) {
      throw new Error("Domain is not found");
    }

    const response = await deleteDomainTag(
      domain,
      userInfo.access_token,
      tagId
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const setDocumentDomainTagsAction = async (
  repoId: number,
  documentId: number,
  tagIds: number[]
) => {
  try {
    const userInfo = await getMe();
    const domain = headers().get("host");

    if (!domain) {
      throw new Error("Domain is not found");
    }

    const response = await setDocumentDomainTags(
      domain,
      userInfo.access_token,
      repoId,
      documentId,
      tagIds
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const addPartyToDomainParticipantsAction = async (
  userNameList: string,
) => {
  try {
    const userInfo = await getMe();
    const domain = headers().get("host");

    if (!domain) {
      throw new Error("Domain is not found");
    }

    const response = await addPartyToDomainParticipants(
      domain,
      userInfo.access_token,
      userNameList,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const removePartyFromDomainParticipantsAction = async (
  userNameList: string[],
) => {
  try {
    const userInfo = await getMe();
    const domain = headers().get("host");

    if (!domain) {
      throw new Error("Domain is not found");
    }

    const response = await removePartyFromDomainParticipants(
      domain,
      userInfo.access_token,
      userNameList
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
