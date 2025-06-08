"use server";

import { IActionError } from "@interface/app.interface";
import { normalizeError } from "@utils/normalizeActionError";
import { getMe } from "./auth";
import { getDocumentCustomPost, updateDocumentCustomPost } from "@service/clasor";
import { ISeo } from "@interface/social.interface";

export const getDocumentCustomPostAction = async (repoId: number, documentId: number) => {
  const userInfo = await getMe();
  try {
    const response = await getDocumentCustomPost(userInfo.access_token, repoId, documentId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const updateDocumentCustomPostAction = async (
  repoId: number,
  documentId: number,
  content: ISeo,
) => {
  const userInfo = await getMe();
  const contentString = JSON.stringify(content);
  try {
    const response = await updateDocumentCustomPost(
      userInfo.access_token,
      repoId,
      documentId,
      contentString,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
