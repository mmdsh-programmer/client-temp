import React from "react";
import { IVersion } from "@interface/version.interface";
import RepositoryInfo from "@components/organisms/repositoryInfo";
import { notFound } from "next/navigation";
import { toEnglishDigit } from "@utils/index";
import { getRepositoryData } from "@utils/publish";
import {
  getPublishDocumentInfo,
  getPublishDocumentLastVersion,
  getPublishDocumentVersion,
} from "@service/clasor";
import BasicError, { ServerError } from "@utils/error";
import PublishVersionContent from "@components/pages/publish";
import { FolderEmptyIcon } from "@components/atoms/icons";
// import { userInfoAction } from "@actions/auth";
import PublishDocumentPassword from "@components/pages/publish/publishDocumentPassword";
import { getDocumentPasswordAction } from "@actions/cookies";
// import PublishDocumentSignin from "@components/pages/publish/publishDocumentSignin";

type PageParams = {
  name: string;
  id: string;
  slug?: string[];
};

type DocumentVersionParams = {
  repoId: number;
  documentId: number;
  versionId?: number;
  documentPassword?: string;
};

async function getDocumentVersion({
  repoId,
  documentId,
  versionId,
  documentPassword,
}: DocumentVersionParams): Promise<IVersion> {
  const resolvedVersionId =
    versionId ??
    (await (async () => {
      const lastVersionInfo = await getPublishDocumentLastVersion(
        repoId,
        documentId,
        documentPassword
      );
      if (!lastVersionInfo) {
        throw new ServerError(["سند مورد نظر فاقد آخرین نسخه میباشد."]);
      }
      return lastVersionInfo.id;
    })());

  return getPublishDocumentVersion(
    repoId,
    documentId,
    resolvedVersionId,
    documentPassword
  );
}

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

    if (Number.isNaN(documentId) || (hasVersion && Number.isNaN(versionId))) {
      return notFound();
    }

    const documentPassword = await getDocumentPasswordAction(documentId);
    const documentInfo = await getPublishDocumentInfo(
      parsedRepoId,
      documentId,
      true
    );

    // const userInfo = await userInfoAction();
    // const ssoId =
    //   userInfo && !("error" in userInfo) ? userInfo.ssoId : undefined;

    // if ((documentInfo.hasWhiteList || documentInfo.hasBlackList) && !ssoId) {
    //   return <PublishDocumentSignin />;
    // }
  
    if (documentInfo.hasPassword && !documentPassword) {
      return <PublishDocumentPassword documentId={documentId} />;
    }

    try {
      const versionData = await getDocumentVersion({
        repoId: repository.id,
        documentId,
        versionId,
        documentPassword: documentPassword || undefined,
      });

      return <PublishVersionContent version={versionData} />;
    } catch (error) {
      if (error instanceof BasicError && error.errorCode === 403) {
        return (
          <PublishDocumentPassword
            documentId={documentId}
            documentPassword={documentPassword || undefined}
            errorMessage={error.message}
          />
        );
      }
      throw error;
    }
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
