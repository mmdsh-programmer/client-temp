import {
  getCustomPostByDomain,
  getDocumentPublishLink,
  getPublishedDocumentLastVersion,
  getPublishedDocumentVersion,
} from "@service/clasor";
import { decodeKey, hasEnglishDigits, toEnglishDigit } from "@utils/index";

import { FolderEmptyIcon } from "@components/atoms/icons";
import { IVersion } from "@interface/version.interface";
import PublishVersionContent from "@components/pages/publish";
import React from "react";
import RedirectPage from "@components/pages/redirectPage";
import { ServerError } from "@utils/error";
import { notFound } from "next/navigation";
import { ICustomPostData } from "@interface/app.interface";
import { generateCachePageTag } from "@utils/generateCachePageTag";
import PublishEncryptedWrapper from "@components/pages/publish/publishEncryptedWrapper";

export const generateStaticParams = async () => {
  return [];
};

type PublishContentPageProps = {
  params: Promise<{ domain: string; name: string; id: string; slug: string[] }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

const SharePage = async ({ params }: PublishContentPageProps) => {
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

    const enSlug = slug.map((s) => {
      return toEnglishDigit(decodeURIComponent(s));
    });

    const lastSlug = enSlug[enSlug.length - 1];
    const hasVersion = lastSlug.startsWith("v-");
    const documentId = parseInt(hasVersion ? enSlug[1] : lastSlug, 10);
    const documentName = enSlug[0];

    const versionId = hasVersion ? parseInt(lastSlug.replace("v-", ""), 10) : undefined;

    if (!documentId || Number.isNaN(documentId)) {
      await generateCachePageTag([`dc-ph-${documentId}`, `i-${domain}`], 60);
      return notFound();
    }

    const documentInfo = await getDocumentPublishLink(undefined, +documentId!, false);
    const documentInfoName = documentInfo.name.replaceAll(/\s+/g, "-");

    if (documentInfo.isHidden || toEnglishDigit(documentInfoName) !== documentName) {
      await generateCachePageTag([`dc-ph-${documentId}`, `i-${domain}`], 60);
      return notFound();
    }

    if (documentInfo?.hasPassword || documentInfo?.hasWhiteList || documentInfo?.hasBlackList) {
      const privatePath = `/privateDoc/${name}/${id}/${slug?.join("/")}`;
      return <RedirectPage redirectUrl={privatePath} />;
    }

    let versionData: IVersion;

    if (hasVersion && versionId && !Number.isNaN(versionId)) {
      versionData = await getPublishedDocumentVersion(undefined, +documentId!, versionId);
    } else {
      const lastVersionInfo = await getPublishedDocumentLastVersion(undefined, +documentId!);
      if (!lastVersionInfo) {
        await generateCachePageTag([`dc-ph-${documentId}`, `i-${domain}`], 60);
        throw new ServerError(["این سند فاقد نسخه ی عمومی می باشد."]);
      }
      versionData = await getPublishedDocumentVersion(undefined, +documentId!, lastVersionInfo!.id);
    }

    const versionNumber = enSlug[enSlug.length - 2];
    await generateCachePageTag([`vr-${versionData.id}`, `dc-ph-${documentId}`, `i-${domain}`]);
    if (
      hasVersion &&
      versionData &&
      toEnglishDigit(versionData.versionNumber).replaceAll(/\s+/g, "-") !== versionNumber
    ) {
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

    return (
      <div className={enableDefaultFontFamily ? "default-font-family" : undefined}>
        <PublishEncryptedWrapper documentInfo={documentInfo} version={versionData}>
          <PublishVersionContent document={documentInfo} version={versionData} />
        </PublishEncryptedWrapper>
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
};

export default SharePage;
