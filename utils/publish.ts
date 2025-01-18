import { IActionError } from "@interface/app.interface";
import { getPublishRepositoryInfo } from "@service/clasor";
import { headers } from "next/dist/client/components/headers";
import { normalizeError } from "./normalizeActionError";

export async function getRepositoryData(repoId: number) {
  const domain = headers().get("host");
  if (!domain) {
    throw new Error("Domain is not found");
  }
  
  try {
    const response = await getPublishRepositoryInfo(repoId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
}
