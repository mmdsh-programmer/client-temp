"use server";

import { IActionError } from "@interface/app.interface";
import { createTinyLink } from "@service/tinyLink";
import { normalizeError } from "@utils/normalizeActionError";

export const createTinyLinkAction = async (url: string) => {
  try {
    const response = await createTinyLink(url);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
