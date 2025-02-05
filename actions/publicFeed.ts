"use server";

import {
  createDomainFeed,
  deleteDomainFeed,
  getDomainFeeds,
  updateDomainFeed,
} from "@service/clasor";
import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";

export const getPublicFeedsAction = async (
  domainId: number,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();
  try {
    const response = await getDomainFeeds(
      userInfo.access_token,
      domainId,
      offset,
      size
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createPublicFeedAction = async (
  domainId: number,
  name: string,
  content: string
) => {
  const userInfo = await getMe();
  try {
    const response = await createDomainFeed(
      userInfo.access_token,
      domainId,
      name,
      content
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const updatePublicFeedAction = async (
  domainId: number,
  feedId: number,
  name: string,
  content: string
) => {
  const userInfo = await getMe();
  try {
    const response = await updateDomainFeed(
      userInfo.access_token,
      domainId,
      feedId,
      name,
      content
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deletePublicFeedAction = async (
  domainId: number,
  feedId: number
) => {
  const userInfo = await getMe();
  try {
    const response = await deleteDomainFeed(
      userInfo.access_token,
      domainId,
      feedId
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
