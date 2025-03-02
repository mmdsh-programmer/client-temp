"use server";

import { enableDocChat } from "@service/clasor";
import { IActionError } from "@interface/app.interface";
import { normalizeError } from "@utils/normalizeActionError";
import { getMe } from "./auth";

export const enableDocChatAction = async (repoId: number, docId: number) => {
    const userInfo = await getMe();
  try {
    const response = await enableDocChat(
      userInfo.access_token,
      repoId,
      docId
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
