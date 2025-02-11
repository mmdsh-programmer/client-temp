"use server";

import { getDomainPrivateFeeds, getDomainPublicFeeds } from "@service/clasor";
import { IActionError } from "@interface/app.interface";
import { normalizeError } from "@utils/normalizeActionError";
import { getMe } from "./auth";
import { headers } from "next/headers";

export const getDomainPublicFeedsAction = async (
  offset: number,
  size: number
) => {
  const domain = headers().get("host");
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

export const getDomainPrivateFeedsAction = async (
  offset: number,
  size: number,
  repoId?: number,
) => {
  const userInfo = await getMe();
  const domain = headers().get("host");
  if (!domain) {
    throw new Error("Domain is not found");
  }
  try {
    const result = await getDomainPrivateFeeds(
      domain,
      userInfo.access_token,
      offset,
      size,
      repoId
    );
    return result;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
