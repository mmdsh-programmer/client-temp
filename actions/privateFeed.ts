"use server";

import {
  createPrivateFeed,
  deletePrivateFeed,
  getDomainFeeds,
  updatePrivateFeed,
} from "@service/clasor";
import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";

export const getPrivateFeedsAction = async (offset: number, size: number) => {
  const userInfo = await getMe();
  // const domain = headers().get("host");
  // if (!domain) {
  //   throw new Error("Domain is not found");
  // }
  const domain = "http://zahraesp.ir";
  try {
    const response = await getDomainFeeds(
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

export const createPrivateFeedAction = async (
  repoId: number,
  name: string,
  content: string,
  link?: string,
  image?: string
) => {
  const userInfo = await getMe();

  try {
    const response = await createPrivateFeed(
      userInfo.access_token,
      repoId,
      name,
      content,
      link,
      image
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const updatePrivateFeedAction = async (
  repoId: number,
  feedId: number,
  name: string,
  content: string,
  link?: string,
  image?: string
) => {
  const userInfo = await getMe();
  try {
    const response = await updatePrivateFeed(
      userInfo.access_token,
      repoId,
      feedId,
      name,
      content,
      link,
      image
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deletePrivateFeedAction = async (
  repoId: number,
  feedId: number
) => {
  const userInfo = await getMe();

  try {
    const response = await deletePrivateFeed(
      userInfo.access_token,
      repoId,
      feedId
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
