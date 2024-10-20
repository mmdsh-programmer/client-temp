"use server";

import { createTinyLink } from "@service/tinyLink";
import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";

export const createTinyLinkAction = async (url: string) => {
  const userInfo = await getMe();
  try {
    const response = await createTinyLink(userInfo.access_token, url);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
