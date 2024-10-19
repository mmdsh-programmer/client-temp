"use server";

import { getContent } from "@service/clasor";
import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";

export const getContentAction = async (
  repoId: number,
  searchParam: string,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();
  try {
    const response = await getContent(
      userInfo.access_token,
      repoId,
      searchParam,
      offset,
      size
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
