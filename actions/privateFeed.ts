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

export const getPublicFeedsAction = async (offset: number, size: number) => {
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

export const createPublicFeedAction = async (name: string, content: string) => {
  const userInfo = await getMe();
  // const domain = headers().get("host");
  // if (!domain) {
  //   throw new Error("Domain is not found");
  // }
  const domain = "http://zahraesp.ir";
  try {
    const response = await createDomainFeed(
      userInfo.access_token,
      domain,
      name,
      content
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const updatePublicFeedAction = async (
  feedId: number,
  name: string,
  content: string
) => {
  const userInfo = await getMe();
  // const domain = headers().get("host");
  // if (!domain) {
  //   throw new Error("Domain is not found");
  // }
  const domain = "http://zahraesp.ir";
  try {
    const response = await updateDomainFeed(
      userInfo.access_token,
      domain,
      feedId,
      name,
      content
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deletePublicFeedAction = async (feedId: number) => {
  const userInfo = await getMe();
  // const domain = headers().get("host");
  // if (!domain) {
  //   throw new Error("Domain is not found");
  // }
  const domain = "http://zahraesp.ir";
  try {
    const response = await deleteDomainFeed(
      userInfo.access_token,
      domain,
      feedId
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
