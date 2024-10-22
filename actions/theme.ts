"use server";

import { IActionError } from "@interface/app.interface";
import { getCustomPostByDomain } from "@service/social";
import { headers } from "next/headers";
import { normalizeError } from "@utils/normalizeActionError";

export const getThemeAction = async () => {
  // get domain and find proper custom post base on domain
  const domain = headers().get("host");
  try {
    if (!domain) {
      throw new Error("Domain is not found");
    }

    const { data } = await getCustomPostByDomain(domain);
    const { projectDescription, projectName, logo, heroImage } = JSON.parse(data) as {
      projectDescription?: string;
      projectName?: string;
      logo?: string;
      heroImage?: string;
    };

    return { projectDescription, projectName, logo, heroImage };
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
