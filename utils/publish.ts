import { notFound } from "next/navigation";
import { getPublishRepositoryInfo } from "@service/clasor";

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