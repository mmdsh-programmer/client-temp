"use server";

import { getDomainPublicFeeds } from "@service/clasor";
import { IActionError } from "@interface/app.interface";
import { normalizeError } from "@utils/normalizeActionError";

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
