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
import { headers } from "next/dist/client/components/headers";
import { getCustomPostByDomain } from "@service/social";

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
  const domain = headers().get("host");
  if (!domain) {
    throw new Error("Domain is not found");
  }
  const domainInfo = await getCustomPostByDomain(domain);

  try {
    const response = await acceptDraft(
      domainInfo.type,
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
  versionId: number
) => {
  const userInfo = await getMe();
  const domain = headers().get("host");
  if (!domain) {
    throw new Error("Domain is not found");
  }
  const domainInfo = await getCustomPostByDomain(domain);

  try {
    const response = await acceptVersion(
      domainInfo.type,
      userInfo.access_token,
      repoId,
      docId,
      versionId
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const rejectVersionAction = async (repoId: number, docId: number) => {
  const userInfo = await getMe();
  try {
    const response = await rejectVersion(userInfo.access_token, repoId, docId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
