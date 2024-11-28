import { IActionError } from "@interface/app.interface";
import { getPublishRepositoryInfo } from "@service/clasor";
import { normalizeError } from "./normalizeActionError";

export async function getRepositoryData(repoId: number) {
  try {
    const response = await getPublishRepositoryInfo(repoId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
}
