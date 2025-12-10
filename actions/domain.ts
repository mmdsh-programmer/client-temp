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
  removePartyFromDomainParticipants,
  updateCustomPostByDomain,
  getDomainDocuments,
  getDomainVersions,
  getDomainQuestionList,
  confirmQuestionByDomainAdmin,
  rejectQuestionByDomainAdmin,
  getDomainAnswerList,
  deleteQuestionByDomainAdmin,
  confirmAnswerByDomainAdmin,
  deleteAnswerByDomainAdmin,
  rejectAnswerByDomainAdmin,
} from "@service/clasor";
import { getMe } from "./auth";
import { getDomainHost } from "@utils/getDomain";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";
import { ISearchSortParams } from "@components/organisms/publishSearch/publishAdvancedSearch";

export const getCustomPostByDomainAction = async () => {
  try {
    const domain = await getDomainHost();

    if (!domain) {
      throw new Error("Domain is not found");
    }
    const response = await getCustomPostByDomain(domain);
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const updateCustomPostByDomainAction = async (
  content?: string,
  useDomainTag?: boolean,
  hasLikes?: boolean,
  hasComments?: boolean,
  hasQuestions?: boolean,
  needsAdminApprovalForComments?: boolean,
  needsAdminApprovalForQuestions?: boolean,
  allowQuestionReplies?: boolean,
  accessToCreateRepo?: boolean,
  enablePublishPage?: boolean,
) => {
  try {
    const userInfo = await getMe();

    const domain = await getDomainHost();

    if (!domain) {
      throw new Error("Domain is not found");
    }

    const response = await updateCustomPostByDomain(
      userInfo.access_token,
      domain,
      content,
      useDomainTag,
      hasLikes,
      hasComments,
      hasQuestions,
      needsAdminApprovalForComments,
      needsAdminApprovalForQuestions,
      allowQuestionReplies,
      accessToCreateRepo,
      enablePublishPage,
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getDomainPublishRepositoriesAction = async (offset: number, size: number) => {
  try {
    const userInfo = await getMe();

    const domain = await getDomainHost();
    if (!domain) {
      throw new Error("Domain is not found");
    }
    const response = await getDomainPublishRepoList(userInfo.access_token, domain, offset, size);
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createDomainTagAction = async (name: string, description: string, order: number) => {
  try {
    const userInfo = await getMe();
    const domain = await getDomainHost();

    if (!domain) {
      throw new Error("Domain is not found");
    }

    const response = await createDomainTag(domain, userInfo.access_token, name, description, order);
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getAllDomainTagsAction = async (offset: number, size: number) => {
  try {
    const userInfo = await getMe();
    const domain = await getDomainHost();

    if (!domain) {
      throw new Error("Domain is not found");
    }

    const response = await getAllDomainTags(domain, userInfo.access_token, offset, size);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getDomainTagByIdAction = async (tagId: number) => {
  try {
    const userInfo = await getMe();
    const domain = await getDomainHost();

    if (!domain) {
      throw new Error("Domain is not found");
    }

    const response = await getDomainTagById(domain, userInfo.access_token, tagId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const updateDomainTagAction = async (tagId: number, name?: string, description?: string) => {
  try {
    const userInfo = await getMe();
    const domain = await getDomainHost();

    if (!domain) {
      throw new Error("Domain is not found");
    }

    const response = await updateDomainTag(domain, userInfo.access_token, tagId, name, description);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteDomainTagAction = async (tagId: number) => {
  try {
    const userInfo = await getMe();
    const domain = await getDomainHost();

    if (!domain) {
      throw new Error("Domain is not found");
    }

    const response = await deleteDomainTag(domain, userInfo.access_token, tagId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const setDocumentDomainTagsAction = async (
  repoId: number,
  documentId: number,
  tagIds: number[],
  isDirectAccess?: boolean,
) => {
  try {
    const userInfo = await getMe();
    const domain = await getDomainHost();

    if (!domain) {
      throw new Error("Domain is not found");
    }

    const response = await setDocumentDomainTags(
      domain,
      userInfo.access_token,
      repoId,
      documentId,
      tagIds,
      isDirectAccess,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const addPartyToDomainParticipantsAction = async (userNameList: string) => {
  try {
    const userInfo = await getMe();
    const domain = await getDomainHost();

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

export const removePartyFromDomainParticipantsAction = async (userNameList: string[]) => {
  try {
    const userInfo = await getMe();
    const domain = await getDomainHost();

    if (!domain) {
      throw new Error("Domain is not found");
    }

    const response = await removePartyFromDomainParticipants(
      domain,
      userInfo.access_token,
      userNameList,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getDomainDocumentsAction = async (
  repoId: number | undefined,
  title: string,
  tagIds: number | number[] | undefined,
  creatorUserName: string | undefined,
  sortParams: ISearchSortParams,
  offset: number,
  size: number,
) => {
  try {
    const domain = await getDomainHost();

    if (!domain) {
      throw new Error("Domain is not found");
    }

    const response = await getDomainDocuments(
      domain,
      repoId,
      title,
      tagIds,
      creatorUserName,
      sortParams,
      offset,
      size,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getDomainVersionsAction = async (
  repoId: number | undefined,
  docId: number | undefined,
  title: string,
  docTitle: string | undefined,
  creatorUserName: string | undefined,
  sortParams: ISearchSortParams,
  withTemplate: string | undefined,
  isTemplate: string | undefined,
  contentType: string | undefined,
  offset: number,
  size: number,
) => {
  try {
    const domain = await getDomainHost();

    if (!domain) {
      throw new Error("Domain is not found");
    }

    const response = await getDomainVersions(
      domain,
      repoId,
      docId,
      title,
      docTitle,
      creatorUserName,
      sortParams,
      withTemplate,
      isTemplate,
      contentType,
      offset,
      size,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getDomainQuestionListAction = async (
  repoId: number,
  documentId: number,
  offset: number,
  size: number,
) => {
  const userInfo = await getMe();

  try {
    const accessToken = userInfo.access_token;
    const response = await getDomainQuestionList(accessToken, repoId, documentId, offset, size);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const confirmQuestionByDomainAdminAction = async (
  repoId: number,
  documentId: number,
  questionId: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await confirmQuestionByDomainAdmin(
      userInfo.access_token,
      repoId,
      documentId,
      questionId,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const rejectQuestionByDomainAdminAction = async (
  repoId: number,
  documentId: number,
  questionId: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await rejectQuestionByDomainAdmin(
      userInfo.access_token,
      repoId,
      documentId,
      questionId,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteQuestionByDomainAdminAction = async (
  repoId: number,
  documentId: number,
  questionId: number,
  postIds: number[],
) => {
  const userInfo = await getMe();
  try {
    const response = await deleteQuestionByDomainAdmin(
      userInfo.access_token,
      repoId,
      documentId,
      questionId,
      postIds,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getDomainAnswerListAction = async (
  repoId: number,
  documentId: number,
  questionId: number,
  offset: number,
  size: number,
) => {
  const userInfo = await getMe();

  try {
    const accessToken = userInfo.access_token;
    const response = await getDomainAnswerList(
      accessToken,
      repoId,
      documentId,
      questionId,
      offset,
      size,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const confirmAnswerByDomainAdminAction = async (
  repoId: number,
  documentId: number,
  entityId: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await confirmAnswerByDomainAdmin(
      userInfo.access_token,
      repoId,
      documentId,
      entityId,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const rejectAnswerByDomainAdminAction = async (
  repoId: number,
  documentId: number,
  entityId: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await rejectAnswerByDomainAdmin(
      userInfo.access_token,
      repoId,
      documentId,
      entityId,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteAnswerByDomainAdminAction = async (
  repoId: number,
  documentId: number,
  postIds: number[],
) => {
  const userInfo = await getMe();
  try {
    const response = await deleteAnswerByDomainAdmin(
      userInfo.access_token,
      repoId,
      documentId,
      postIds,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
