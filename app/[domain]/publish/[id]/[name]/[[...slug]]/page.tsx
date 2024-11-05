import React from "react";
import { IVersion } from "@interface/version.interface";
import RepositoryInfo from "@components/organisms/repositoryInfo";
import { notFound } from "next/navigation";
import { toEnglishDigit } from "@utils/index";
import { getRepositoryData } from "@utils/publish";
import {
  // getDocument,
  getPublishDocumentLastVersion,
  getPublishDocumentVersion,
} from "@service/clasor";
import { ServerError } from "@utils/error";
import PublishVersionContent from "@components/pages/publish";
import { FolderEmptyIcon } from "@components/atoms/icons";
import { IRepo } from "@interface/repo.interface";
// import PublishDocumentPassword from "@components/pages/publish/publishDocumentPassword";
// import { userInfoAction } from "@actions/auth";
// import { getDocumentPasswordAction } from "@actions/cookies";

export interface IPublishProps {
  uniqueId: number;
  repoId: number;
  repoName: string;
  repository?: IRepo;
  error?: { status: number; messages: string[] };
  data?: IVersion;
}

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

    // const userInfo = await userInfoAction();
    // const userAccessToken =
    // userInfo && !("error" in userInfo) ? userInfo.access_token : undefined;

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

    let documentId: number;
    let versionData: IVersion;

    if (hasVersion) {
      const versionId = parseInt(lastSlug.replace("v-", ""), 10);
      documentId = parseInt(slug[slug.length - 3], 10);

      if (Number.isNaN(versionId) || Number.isNaN(documentId)) {
        return notFound();
      }

      // const documentInfo = await getDocument(
      //   userAccessToken || process.env.API_TOKEN as string,
      //   +repoId,
      //   documentId
      // );

      // if (documentInfo.hasPassword) {
      //   return <PublishDocumentPassword documentId={documentId} />;
      // }

      versionData = await getPublishDocumentVersion(
        repository.id,
        documentId,
        versionId
      );
    } else {
      documentId = parseInt(lastSlug, 10);

      if (Number.isNaN(documentId)) {
        return notFound();
      }

      // const documentInfo = await getDocument(
      //   userAccessToken || process.env.API_TOKEN as string,
      //   +repoId,
      //   documentId
      // );

      // if (true) {
      //   return <PublishDocumentPassword documentId={documentId}  />;
      // }

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
    if (error instanceof Error) {
      return (
        <section className="main w-full h-[calc(100vh-156px)] text-center bg-slate-50 grid justify-items-center place-items-center">
          <div className="flex flex-col justify-center items-center">
            <FolderEmptyIcon />
            {error.message}
          </div>
        </section>
      );
    }
  }
}
