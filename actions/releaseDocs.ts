"use server";

import { normalizeError } from "@utils/normalizeActionError";
import { getMe } from "./auth";
import {
  acceptDraft,
  acceptVersion,
  getPendingDrafts,
  getPendingVersion,
  rejectDraft,
  rejectVersion,
} from "@service/clasor";
import { IActionError } from "@interface/app.interface";

export const getPendingDraftsAction = async (
  repoId: number,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();
  try {
    const response = await getPendingDrafts(
      userInfo.access_token,
      repoId,
      offset,
      size
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getPendingVersionAction = async (
  repoId: number,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();
  try {
    const response = await getPendingVersion(
      userInfo.access_token,
      repoId,
      offset,
      size
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const acceptDraftAction = async (
  repoId: number,
  docId: number,
  draftId: number
) => {
  const userInfo = await getMe();
  try {
    const response = await acceptDraft(
      userInfo.access_token,
      repoId,
      docId,
      draftId
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const rejectDraftAction = async (
  repoId: number,
  docId: number,
  draftId: number
) => {
  const userInfo = await getMe();
  try {
    const response = await rejectDraft(
      userInfo.access_token,
      repoId,
      docId,
      draftId
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const acceptVersionAction = async (
  repoId: number,
  docId: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await acceptVersion(
      userInfo.access_token,
      repoId,
      docId,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const rejectVersionAction = async (
  repoId: number,
  docId: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await rejectVersion(
      userInfo.access_token,
      repoId,
      docId,
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
