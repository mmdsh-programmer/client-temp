import React from "react";
import {
  getPublishDocumentLastVersion,
  getPublishDocumentVersion,
  getPublishRepositoryInfo,
} from "@service/clasor";
import { IRepo } from "@interface/repo.interface";
import { IVersion } from "@interface/version.interface";
import { toEnglishDigit } from "@utils/index";

export interface IPublishProps {
  uniqueId: number;
  repoId: number;
  repoName: string;
  repository?: IRepo;
  error?: { status: number; messages: string[] };
  data?: IVersion;
}

async function getPublishData(params: string[]) {
  const repoId = Number.parseInt(toEnglishDigit(decodeURIComponent(params[1])), 10);

  const repoInfoResponse = await getPublishRepositoryInfo(+repoId);

  const repoName = repoInfoResponse.name;
  if (!repoId || Number.isNaN(Number(repoId))) {
    return {
      uniqueId: Date.now(),
      repoId,
      repoName,
      repository: null,
      data: null,
    };
  }

  const hasVersion = (params[params.length - 1] as string).startsWith("v-");
  let versionId: number | null = null;
  if (hasVersion) {
    const id = params[params.length - 1].replace("v-", "");
    if (Number.isNaN(Number(id))) {
      return {
        uniqueId: Date.now(),
        repoId,
        repoName,
        repository: null,
        data: null,
      };
    }
    versionId = +id;
  }

  const index = versionId ? 3 : 1;
  const docId = params.length === 2 ? null : params[params.length - index];

  if (repoId && (!docId || Number.isNaN(Number(docId)))) {
    const { name, description, owner, imageFileHash } = repoInfoResponse;
    return {
      uniqueId: Date.now(),
      repoId,
      repoName,
      repository: {
        name,
        description,
        owner,
        imageFileHash,
      },
      data: null,
    };
  }

  if (versionId && docId) {
    const versionInfo = await getPublishDocumentVersion(
      +repoId,
      +docId,
      versionId
    );

    return {
      uniqueId: Date.now(),
      repoId,
      repoName,
      repository: null,
      data: versionInfo,
    };
  }

  if (docId) {
    const lastVersionResponse = await getPublishDocumentLastVersion(
      +repoId,
      +docId
    );

    if (lastVersionResponse) {
      const response = await getPublishDocumentVersion(
        +repoId,
        +docId,
        lastVersionResponse.id
      );

      return {
        uniqueId: Date.now(),
        repoId,
        repoName,
        repository: null,
        data: response,
      };
    }
  }

  return {
    uniqueId: Date.now(),
    repoId,
    repoName,
    repository: null,
    data: null,
  };
}

export default async function PublishContentPage({
  params,
}: {
  params: { slug: string[] };
}) {
  try {
    const { uniqueId, repoId, repoName, repository, data } =
      await getPublishData(params.slug);

    return <div>{repoName}</div>;
  } catch (error: any) {
    const errorMessage = Array.isArray(error.messages)
      ? error.messages[0]
      : JSON.stringify(error);

    return (
      <div className="main w-full min-h-screen text-center bg-slate-50 flex items-center justify-center">
        {errorMessage}
      </div>
    );
  }
}
