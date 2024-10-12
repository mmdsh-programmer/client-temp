"use server";

import { createTinyLink } from "@service/tinyLink";
import { getMe } from "./auth";

export const createTinyLinkAction = async (url: string) => {
  const userInfo = await getMe();

  const response = await createTinyLink(userInfo.access_token, url);

  return response;
};
