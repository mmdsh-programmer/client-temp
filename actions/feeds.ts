"use server";

import {
  getDomainPrivateFeeds,
  getDomainPublicFeeds,
  getFollowingRepoFeeds,
  getFollowingRepos,
} from "@service/clasor";
import { IActionError } from "@interface/app.interface";
import { normalizeError } from "@utils/normalizeActionError";
import { getMe } from "./auth";
import { getDomainHost } from "@utils/getDomain";

export const getDomainPublicFeedsAction = async (offset: number, size: number) => {
  const domain = await getDomainHost();
  if (!domain) {
    throw new Error("Domain is not found");
  }
  try {
    const result = await getDomainPublicFeeds(domain, offset, size);
    return result;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getDomainPrivateFeedsAction = async (repoId: number, offset: number, size: number) => {
  const userInfo = await getMe();
  try {
    const result = await getDomainPrivateFeeds(userInfo.access_token, repoId, offset, size);
    return result;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getFollowingReposAction = async (offset: number, size: number) => {
  const userInfo = await getMe();
  const domain = await getDomainHost();
  if (!domain) {
    throw new Error("Domain is not found");
  }
  try {
    const result = await getFollowingRepos(domain, userInfo.access_token, offset, size);
    return result;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getFollowingRepoFeedsAction = async (repoId: number, offset: number, size: number) => {
  const userInfo = await getMe();
  try {
    const result = await getFollowingRepoFeeds(userInfo.access_token, repoId, offset, size);
    return result;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
