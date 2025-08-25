"use server";

import {
  acceptUserToRepoRequest,
  getCustomPostByDomain,
  getUserToRepoRequests,
  rejectUserToRepoRequest,
} from "@service/clasor";

import { IActionError } from "@interface/app.interface";
import { getMe } from "./auth";
import { getDomainHost } from "@utils/getDomain";
import { normalizeError } from "@utils/normalizeActionError";

export const getUserToRepoRequestsAction = async (offset: number, size: number) => {
  const userInfo = await getMe();
  try {
    const domain = await getDomainHost();
    if (!domain) {
      throw new Error("Domain is not found");
    }

    const { types } = await getCustomPostByDomain(domain);
    const response = await getUserToRepoRequests(userInfo.access_token, offset, size, types);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const acceptUserToRepoRequestAction = async (requestId: number) => {
  const userInfo = await getMe();
  try {
    const response = await acceptUserToRepoRequest(userInfo.access_token, requestId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const rejectUserToRepoRequestAction = async (requestId: number) => {
  const userInfo = await getMe();
  try {
    const response = await rejectUserToRepoRequest(userInfo.access_token, requestId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
