"use server";

import { IActionError } from "@interface/app.interface";
import { getCustomPostByDomain } from "@service/social";
import { headers } from "next/headers";
import { normalizeError } from "@utils/normalizeActionError";

export const getThemeAction = async () => {
  try {
    // get domain and find proper custom post base on domain
    const domain = headers().get("host");
    if (!domain) {
      throw new Error("Domain is not found");
    }

    const { data } = await getCustomPostByDomain(domain);
    const { projectDescription, projectName, logo } = JSON.parse(data) as {
      projectDescription?: string;
      projectName?: string;
      logo?: string;
    };

    return { projectDescription, projectName, logo };
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
