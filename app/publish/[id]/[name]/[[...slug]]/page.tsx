import React from "react";
import { IRepo } from "@interface/repo.interface";
import { IVersion } from "@interface/version.interface";
import RepositoryInfo from "@components/organisms/repositoryInfo";
import { getPublishRepositoryInfo } from "@service/clasor";
import { notFound } from "next/navigation";
import { toEnglishDigit } from "@utils/index";

export interface IPublishProps {
  uniqueId: number;
  repoId: number;
  repoName: string;
  repository?: IRepo;
  error?: { status: number; messages: string[] };
  data?: IVersion;
}

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

export default async function PublishContentPage({
  params,
}: {
  params: { name: string; id: string; slug: string[] };
}) {
  try {
    const { name, id, slug } = params;
    console.log(decodeURIComponent(id));
    console.log(decodeURIComponent(name));
    const repository = await getRepositoryData(
      Number.parseInt(toEnglishDigit(decodeURIComponent(id)), 10)
    );
    if (!slug) {
      return <RepositoryInfo repository={repository} />;
    }

    const hasVersion = (slug[slug.length - 1] as string).startsWith("v-");

    if (!hasVersion) {
      return notFound();
    }

    const versionId = slug[slug.length - 1].replace("v-", "");
    if (!versionId || Number.isNaN(Number(versionId))) {
      return notFound();
    }

    if (!slug) {
      return <div>no slug</div>;
    }

    return (
      <div className="flex flex-col">
        <span>name: {decodeURIComponent(name)}</span>
        <span>id: {decodeURIComponent(id)}</span>
        <span>slug: {JSON.stringify(slug)}</span>
      </div>
    );
  } catch (error) {
    const errorMessage = Array.isArray(
      (error as { messages?: string[] })?.messages
    )
      ? (error as { messages?: string[] })?.messages?.[0]
      : JSON.stringify(error);

    return (
      <div className="main w-full min-h-screen text-center bg-slate-50 flex items-center justify-center">
        {errorMessage}
      </div>
    );
  }
}
