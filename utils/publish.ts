import { IActionError } from "@interface/app.interface";
import { getPublishRepositoryInfo } from "@service/clasor";
import { normalizeError } from "./normalizeActionError";
import { headers } from "next/dist/client/components/headers";
import { getCustomPostByDomain } from "@service/social";

export async function getRepositoryData(repoId: number) {
  const domain = headers().get("host");
  if (!domain) {
    throw new Error("Domain is not found");
  }
  const domainInfo = await getCustomPostByDomain(domain);

  try {
    const response = await getPublishRepositoryInfo(domainInfo.type, repoId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
}
