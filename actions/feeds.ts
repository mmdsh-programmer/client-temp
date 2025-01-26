"use server";

import { getDomainPrivateFeeds, getDomainPublicFeeds } from "@service/clasor";
import { IActionError } from "@interface/app.interface";
import { normalizeError } from "@utils/normalizeActionError";
import { getMe } from "./auth";

export const getDomainPublicFeedsAction = async (
  domainId: number,
  offset: number,
  size: number
) => {
  try {
    const result = await getDomainPublicFeeds(domainId, offset, size);
    return result;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getDomainPrivateFeedsAction = async (
  offset: number,
  size: number
) => {
  const userInfo = await getMe();
  try {
    const result = await getDomainPrivateFeeds(
      userInfo.access_token,
      offset,
      size
    );
    return result;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
