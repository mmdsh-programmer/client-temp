import BasicError, { ServerError } from "@utils/error";
import {
  getPublishDocumentInfo,
  getPublishDocumentLastVersion,
  getPublishDocumentVersion,
  getPublishRepositoryInfo,
} from "@service/clasor";

import { FolderEmptyIcon } from "@components/atoms/icons";
import PublishDocumentPassword from "@components/pages/publish/publishDocumentPassword";
import PublishDocumentSignin from "@components/pages/publish/publishDocumentSignin";
import PublishVersionContent from "@components/pages/publish";
import React from "react";
import RedirectPage from "@components/pages/redirectPage";
import RepositoryInfo from "@components/organisms/repositoryInfo";
import { getDocumentPasswordAction } from "@actions/cookies";
import { headers } from "next/dist/client/components/headers";
import { notFound } from "next/navigation";
import { toEnglishDigit } from "@utils/index";
import { userInfoAction } from "@actions/auth";

type PageParams = {
  name: string;
  id: string;
  slug?: string[];
};

async function fetchDocumentVersion(
  repositoryId: number,
  documentId: number,
  versionId: number | undefined,
  documentPassword?: string,
  accessToken?: string
) {
  if (versionId) {
    return getPublishDocumentVersion(
      repositoryId,
      documentId,
      versionId,
      documentPassword,
      accessToken
    );
  }

  const lastVersion = await getPublishDocumentLastVersion(
    repositoryId,
    documentId,
    documentPassword,
    accessToken
  );

  if (!lastVersion?.id) {
    throw new ServerError(["سند مورد نظر فاقد نسخه میباشد."]);
  }

  return getPublishDocumentVersion(
    repositoryId,
    documentId,
    lastVersion.id,
    documentPassword,
    accessToken
  );
}

export default async function PublishContentPage({
  params,
}: {
  params: PageParams;
}) {
  try {
    const { id: repoId, slug } = params;
    const domain = headers().get("host");

    const parsedRepoId = Number.parseInt(
      toEnglishDigit(decodeURIComponent(repoId)),
      10
    );

    if (!domain) {
      throw new Error("Domain is not found");
    }

    if (Number.isNaN(parsedRepoId)) {
      throw new ServerError(["آیدی مخزن صحیح نیست"]);
    }

    const repository = await getPublishRepositoryInfo(parsedRepoId);

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

    if (!documentId || Number.isNaN(documentId)) {
      return notFound();
    }

    const documentInfo = await getPublishDocumentInfo(
      parsedRepoId,
      documentId,
      true
    );

    if (
      !documentInfo?.hasPassword &&
      !documentInfo?.hasWhiteList &&
      !documentInfo?.hasBlackList
    ) {
      const publicSlug = slug?.filter((segment) => {
        return segment !== "private";
      });
      return (
        <RedirectPage
          redirectUrl={`/publish/${repoId}/${params.name}/${publicSlug?.join("/") || ""}`}
        />
      );
    }

    const userInfo = await userInfoAction();
    const accessToken =
      userInfo && !("error" in userInfo) ? userInfo.access_token : undefined;
    const documentPassword = await getDocumentPasswordAction(documentId);

    if (
      (documentInfo?.hasWhiteList || documentInfo?.hasBlackList) &&
      !accessToken
    ) {
      return <PublishDocumentSignin />;
    }

    if (documentInfo?.hasPassword && !documentPassword) {
      return <PublishDocumentPassword documentId={documentId} />;
    }

    try {
      const version = await fetchDocumentVersion(
        repository.id,
        documentId,
        hasVersion ? versionId : undefined,
        documentPassword || undefined,
        accessToken
      );

      if (!version) {
        throw new ServerError(["سند مورد نظر فاقد نسخه میباشد."]);
      }

      return (
        <PublishVersionContent document={documentInfo} version={version} />
      );
    } catch (error) {
      if (error instanceof BasicError && error.errorCode === 400) {
        return (
          <PublishDocumentPassword
            documentPassword={documentPassword || undefined}
            errorMessage={error.message}
            documentId={documentId}
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
