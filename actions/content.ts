"use server";

import { getContent } from "@service/clasor";
import { getMe } from "./auth";

export const getContentAction = async (
  repoId: number,
  searchParam: string,
  offset: number,
  size: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await getContent(
      userInfo.access_token,
      repoId,
      searchParam,
      offset,
      size,
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};
