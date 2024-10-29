import { getPublishRepositoryInfo } from "@service/clasor";
import { notFound } from "next/navigation";

export async function getRepositoryData(repoId: number) {
  if (!repoId || Number.isNaN(Number(repoId))) {
    return notFound();
  }
  const repoInfoResponse = await getPublishRepositoryInfo(+repoId);
  if (!repoInfoResponse) {
    return notFound();
  }
  return repoInfoResponse;
}
