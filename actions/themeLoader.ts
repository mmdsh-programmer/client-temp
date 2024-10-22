"use server";

import { IActionError, IThemeInfo } from "@interface/app.interface";

import { getCustomPostByDomain } from "@service/social";
import { headers } from "next/headers";
import { normalizeError } from "@utils/normalizeActionError";

export const themeLoaderAction = async () => {
  // get domain and find proper custom post base on domain
  const domain = headers().get("host");
  try {
    if (!domain) {
      throw new Error("Domain is not found");
    }

    const { data } = await getCustomPostByDomain(domain);

    const theme = JSON.parse(data ?? "{}") as IThemeInfo;

    return theme;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
