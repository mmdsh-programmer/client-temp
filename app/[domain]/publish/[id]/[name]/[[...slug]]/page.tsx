import {
  getPublishDocumentInfo,
  getPublishDocumentLastVersion,
  getPublishDocumentVersion,
} from "@service/clasor";

import { FolderEmptyIcon } from "@components/atoms/icons";
import { IVersion } from "@interface/version.interface";
import PublishVersionContent from "@components/pages/publish";
import React from "react";
import RepositoryInfo from "@components/organisms/repositoryInfo";
import { ServerError } from "@utils/error";
import { getRepositoryData } from "@utils/publish";
import { notFound } from "next/navigation";
import { toEnglishDigit } from "@utils/index";
import RedirectPage from "@components/pages/redirectPage";

type PageParams = {
  name: string;
  id: string;
  slug?: string[];
};

export default async function PublishContentPage({
  params,
}: {
  params: PageParams;
}) {
  try {
    const { id: repoId, slug } = params;
    const parsedRepoId = Number.parseInt(
      toEnglishDigit(decodeURIComponent(repoId)),
      10
    );

    if (Number.isNaN(parsedRepoId)) {
      throw new ServerError(["آیدی مخزن صحیح نیست"]);
    }

    const repository = await getRepositoryData(parsedRepoId);

    if (!slug?.length) {
      return <RepositoryInfo repository={repository} />;
    }

    const lastSlug = slug[slug.length - 1];
    const hasVersion = lastSlug.startsWith("v-");
    const documentId = parseInt(
      hasVersion ? slug[slug.length - 3] : lastSlug,
      10
    );
    const versionId = hasVersion
      ? parseInt(lastSlug.replace("v-", ""), 10)
      : undefined;

    let versionData: IVersion;

    if (!documentId || Number.isNaN(documentId)) {
      return notFound();
    }

    const documentInfo = await getPublishDocumentInfo(
      parsedRepoId,
      documentId,
      true
    );

    if (
      documentInfo?.hasPassword ||
      documentInfo?.hasWhiteList ||
      documentInfo?.hasBlackList
    ) {
      const privatePath = `/publish/${repoId}/${params.name}/private/${slug.join("/")}`;
      return <RedirectPage redirectUrl={privatePath} />;
    }

    if (hasVersion && versionId && Number.isNaN(versionId)) {
      versionData = await getPublishDocumentVersion(
        repository.id,
        documentId,
        versionId
      );
    } else {
      const lastVersionInfo = await getPublishDocumentLastVersion(
        repository.id,
        documentId
      );

      if (!lastVersionInfo)
        throw new ServerError(["سند مورد نظر فاقد آخرین نسخه میباشد."]);

      versionData = await getPublishDocumentVersion(
        repository.id,
        documentId,
        lastVersionInfo.id
      );
    }

    return <PublishVersionContent version={versionData} />;
  } catch (error) {
    return (
      <section className="main w-full h-[calc(100vh-156px)] text-center bg-slate-50 grid justify-items-center place-items-center">
        <div className="flex flex-col justify-center items-center">
          <FolderEmptyIcon />
          {error instanceof Error ? error.message : "خطای نامشخصی رخ داد"}
        </div>
      </section>
    );
  }
}
