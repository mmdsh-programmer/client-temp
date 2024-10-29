"use server";

import { IActionError, IThemeInfo } from "@interface/app.interface";

import { decodeKey } from "@utils/index";
import { getCustomPostByDomain } from "@service/social";
import { normalizeError } from "@utils/normalizeActionError";

export const themeLoaderAction = async (domainHash: string) => {
  try {
    const domain = decodeKey(domainHash);
    const { data } = await getCustomPostByDomain(domain);

    const theme = JSON.parse(data ?? "{}") as IThemeInfo;

    return theme;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
