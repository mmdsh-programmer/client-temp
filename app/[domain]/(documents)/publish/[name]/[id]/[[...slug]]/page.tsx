import {
  decodeKey,
  hasEnglishDigits,
  removeSpecialCharacters,
  toEnglishDigit,
  toPersianDigit,
} from "@utils/index";
import {
  getCustomPostByDomain,
  getPublishDocumentInfo,
  getPublishDocumentLastVersion,
  getPublishDocumentVersion,
  getPublishRepositoryInfo,
} from "@service/clasor";

import { FolderEmptyIcon } from "@components/atoms/icons";
import { ICustomPostData } from "@interface/app.interface";
import { IVersion } from "@interface/version.interface";
import PublishVersionContent from "@components/pages/publish";
import React from "react";
import RedirectPage from "@components/pages/redirectPage";
import RepositoryInfo from "@components/organisms/repositoryInfo";
import { ServerError } from "@utils/error";
import { notFound } from "next/navigation";
import { unstable_cache as unstableCache } from "next/cache";
import { generateCachePageTag } from "@utils/generateCachePageTag";

export const generateStaticParams = async () => {
  return [];
};

type PublishContentPageProps = {
  params: Promise<{ domain: string; name: string; id: string; slug?: string[] }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function PublishContentPage({ params }: PublishContentPageProps) {
  try {
    const awaitedParams = await params;
    const { id, name, slug, domain } = awaitedParams;

    const decodeId = decodeURIComponent(id);
    if (hasEnglishDigits(decodeId)) {
      throw new ServerError(["آدرس وارد شده نامعتبر است"]);
    }

    const repoId = parseInt(toEnglishDigit(decodeId), 10);

    if (Number.isNaN(repoId)) {
      throw new ServerError(["آیدی مخزن صحیح نیست"]);
    }

    // Check for English digits in slug before converting
    if (
      slug?.some((s) => {
        return hasEnglishDigits(decodeURIComponent(s));
      })
    ) {
      throw new ServerError(["آدرس وارد شده نامعتبر است"]);
    }

    const enSlug = slug?.map((s) => {
      return toEnglishDigit(decodeURIComponent(s));
    });

    const repository = await getPublishRepositoryInfo(repoId);

    const decodeName = removeSpecialCharacters(toPersianDigit(decodeURIComponent(name)));
    const repoName = removeSpecialCharacters(toPersianDigit(repository.name));
    if (decodeName !== repoName) {
      return notFound();
    }

    if (!enSlug?.length) {
      await generateCachePageTag([`rp-ph-${repository.id}`, `i-${domain}`]);
      return <RepositoryInfo repository={repository} />;
    }

    const lastSlug = enSlug[enSlug.length - 1];
    const hasVersion = lastSlug.startsWith("v-");
    const documentId = parseInt(hasVersion ? enSlug[1] : lastSlug, 10);
    const documentName = removeSpecialCharacters(toPersianDigit(enSlug[0]));

    const versionId = hasVersion ? parseInt(lastSlug.replace("v-", ""), 10) : undefined;

    let versionData: IVersion;
    if (!documentId || Number.isNaN(documentId)) {
      await generateCachePageTag([`dc-${documentId}`, `rp-ph-${repository.id}`, `i-${domain}`]);
      return notFound();
    }

    const documentInfo = await getPublishDocumentInfo(repoId, documentId, true);

    const documentInfoName = removeSpecialCharacters(toPersianDigit(documentInfo.name));
    if (documentInfo.isHidden || documentInfoName !== documentName) {
      await generateCachePageTag([`dc-${documentId}`, `rp-ph-${repository.id}`, `i-${domain}`]);
      return notFound();
    }

    if (documentInfo?.hasPassword || documentInfo?.hasWhiteList || documentInfo?.hasBlackList) {
      // CHECK THE CACHE
      const privatePath = `/private/${removeSpecialCharacters(toPersianDigit(decodeName))}/${id}/${slug?.join("/")}`;
      return <RedirectPage redirectUrl={privatePath} />;
    }

    if (hasVersion && versionId && !Number.isNaN(versionId)) {
      versionData = await getPublishDocumentVersion(repository.id, documentId, versionId);
    } else {
      const lastVersionInfo = await getPublishDocumentLastVersion(repository.id, documentId);

      if (!lastVersionInfo) {
        await generateCachePageTag([`dc-${documentId}`, `rp-ph-${repository.id}`, `i-${domain}`]);
        throw new ServerError(["این سند فاقد نسخه ی عمومی می باشد."]);
      }

      versionData = await getPublishDocumentVersion(repository.id, documentId, lastVersionInfo.id);
    }

    const versionNumber = removeSpecialCharacters(toPersianDigit(enSlug[enSlug.length - 2]));
    const originalVersionNumber = removeSpecialCharacters(
      toPersianDigit(versionData.versionNumber),
    );

    await generateCachePageTag([
      `vr-${versionData.id}`,
      `dc-${documentId}`,
      `rp-ph-${repository.id}`,
      `i-${domain}`,
    ]);

    if (hasVersion && versionData && originalVersionNumber !== versionNumber) {
      return notFound();
    }

    const isDev = process.env.NODE_ENV === "development";
    let decodedDomain: string = "";

    if (isDev) {
      decodedDomain = process.env.DOMAIN || "";
    } else {
      decodedDomain = decodeKey(domain);
    }

    const { content } = await getCustomPostByDomain(decodedDomain);
    const { enableDefaultFontFamily } = JSON.parse(content) as ICustomPostData;

    // remove all inline font from html
    if (versionData.content && enableDefaultFontFamily) {
      const placeholder = "##QUOTE##";
      let tempString = versionData.content.replaceAll("&quot;", placeholder);
      const regex = /font-family:.*?;/g;
      tempString = tempString.replaceAll(regex, "");
      const finalString = tempString.replaceAll(placeholder, "&quot;");

      versionData.content = finalString;
    }

    const cacheTags = [
      `vr-${versionData.id}`,
      `dc-${documentId}`,
      `rp-ph-${repository.id}`,
      `i-${domain}`,
    ];

    const getRevalidateTimestamp = unstableCache(
      async () => {
        return Date.now();
      },
      cacheTags,
      { tags: cacheTags, revalidate: 24 * 3600 },
    );

    const revalidateTimestamp = await getRevalidateTimestamp();

    return (
      <div className={enableDefaultFontFamily ? "default-font-family" : undefined}>
        <PublishVersionContent document={documentInfo} version={versionData} />
        <input
          type="hidden"
          data-testid="revalidate-timestamp"
          value={String(revalidateTimestamp)}
        />
      </div>
    );
  } catch (error) {
    const { errorList, errorCode } = error as unknown as {
      errorList: string[];
      errorCode: number;
    };
    console.log(
      JSON.stringify(
        {
          errorList,
          errorCode,
          error: true,
          referenceNumber: "NOT_DEFINED",
        },
        null,
        0,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const message: any = error instanceof Error ? error.message : "خطای نامشخصی رخ داد";
    const errorMsg = typeof message === "string" ? message : message.message;

    if (errorMsg === "NEXT_NOT_FOUND") {
      return notFound();
    }
    return (
      <section className="main bg-slate-50 grid h-[calc(100vh-81px)] w-full place-items-center justify-items-center text-center">
        <div className="flex flex-col items-center justify-center">
          <FolderEmptyIcon />
          <p>{errorMsg}</p>
        </div>
      </section>
    );
  }
}
