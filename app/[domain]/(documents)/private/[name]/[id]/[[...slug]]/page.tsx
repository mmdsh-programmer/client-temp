/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import BasicError, { AuthorizationError, ServerError } from "@utils/error";
import {
  getCustomPostByDomain,
  getPublishDocumentInfo,
  getPublishDocumentLastVersion,
  getPublishDocumentVersion,
  getPublishRepositoryInfo,
} from "@service/clasor";
import {
  decodeKey,
  hasEnglishDigits,
  removeSpecialCharacters,
  toEnglishDigit,
  toPersianDigit,
} from "@utils/index";
import { FolderEmptyIcon } from "@components/atoms/icons";
import { IActionError, ICustomPostData } from "@interface/app.interface";
import LoginRequiredButton from "@components/molecules/loginRequiredButton";
import PublishDocumentPassword from "@components/pages/publish/publishDocumentPassword";
import PublishVersionContent from "@components/pages/publish";
import RedirectPage from "@components/pages/redirectPage";
import { cookies } from "next/headers";
import { getMe } from "@actions/auth";
import { notFound } from "next/navigation";
import PublishDocumentAccessWrapper from "@components/pages/publish/publishDocumentAccessWrapper";
import { IDocumentMetadata } from "@interface/document.interface";
import { unstable_cache as unstableCache } from "next/cache";
import { EDocumentTypes } from "@interface/enums";
import { sanitizeHtmlOnServer } from "@utils/sanitizeHtml";
import PublishEncryptedWrapper from "@components/pages/publish/publishEncryptedWrapper";
import { generateCachePageTag } from "@utils/generateCachePageTag";

type PublishContentPageProps = {
  params: Promise<{ domain: string; name: string; id: string; slug?: string[] }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function fetchDocumentVersion(
  repositoryId: number,
  documentId: number,
  versionId: number | undefined,
  documentPassword?: string,
  accessToken?: string,
) {
  if (versionId) {
    return getPublishDocumentVersion(
      repositoryId,
      documentId,
      versionId,
      documentPassword,
      accessToken,
    );
  }

  const lastVersion = await getPublishDocumentLastVersion(
    repositoryId,
    documentId,
    documentPassword,
    accessToken,
  );

  if (!lastVersion?.id) {
    throw new ServerError(["سند مورد نظر فاقد نسخه می باشد."]);
  }

  return getPublishDocumentVersion(
    repositoryId,
    documentId,
    lastVersion.id,
    documentPassword,
    accessToken,
  );
}

export default async function PublishContentPage({
  params,
}: PublishContentPageProps): Promise<any> {
  let documentInfo: IDocumentMetadata;

  try {
    const awaitedParams = await params;
    const { id, name, slug, domain } = awaitedParams;

    const decodeId = decodeURIComponent(id);
    // Check for English digits in slug before converting
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
      return <RedirectPage redirectUrl={`/publish/${repoName}/${toPersianDigit(id)}`} />;
    }

    const lastSlug = enSlug[enSlug.length - 1];
    const hasVersion = lastSlug.startsWith("v-");
    const documentId = parseInt(hasVersion ? enSlug[1] : lastSlug, 10);
    const documentName = removeSpecialCharacters(toPersianDigit(enSlug[0]));

    const versionId = hasVersion ? parseInt(lastSlug.replace("v-", ""), 10) : undefined;

    if (!documentId || Number.isNaN(documentId)) {
      return notFound();
    }

    documentInfo = await getPublishDocumentInfo(repoId, documentId, true);

    const documentInfoName = removeSpecialCharacters(toPersianDigit(documentInfo.name));
    if (documentInfo.isHidden || documentInfoName !== documentName) {
      return notFound();
    }

    if (!documentInfo?.hasPassword && !documentInfo?.hasWhiteList && !documentInfo?.hasBlackList) {
      const publicSlug = slug?.join("/").replace("/private", "");
      return <RedirectPage redirectUrl={`/publish/${decodeName}/${id}/${publicSlug}`} />;
    }

    // check password cookie
    // caution: reading cookies will cause server side rendering
    const cookieStore = await cookies();
    const documentPassword = cookieStore.get(`document-${documentId}-password`)?.value;

    const encodedToken = cookieStore.get("token")?.value;
    let accessToken: string | undefined;

    if ((documentInfo?.hasWhiteList || documentInfo?.hasBlackList) && !encodedToken) {
      throw new AuthorizationError();
    } else if ((documentInfo?.hasWhiteList || documentInfo?.hasBlackList) && encodedToken) {
      const userInfo = await getMe();
      accessToken = userInfo && !("error" in userInfo) ? userInfo.access_token : undefined;
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
        accessToken,
      );

      await generateCachePageTag([
        `vr-${version.id}`,
        `dc-${documentId}`,
        `rp-ph-${repository.id}`,
        `i-${domain}`,
      ]);

      const versionNumber = removeSpecialCharacters(toPersianDigit(enSlug[enSlug.length - 2]));
      const originalVersionNumber = removeSpecialCharacters(toPersianDigit(version.versionNumber));

      if (hasVersion && version && originalVersionNumber !== versionNumber) {
        return notFound();
      }

      if (!version) {
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
      if (version.content && enableDefaultFontFamily) {
        const placeholder = "##QUOTE##";
        let tempString = version.content.replaceAll("&quot;", placeholder);
        const regex = /font-family:.*?;/g;
        tempString = tempString.replaceAll(regex, "");
        const finalString = tempString.replaceAll(placeholder, "&quot;");

        version.content = finalString;
      }

      const cacheTags = [
        `vr-${version.id}`,
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

      if (version.contentType === EDocumentTypes.classic && version.content) {
        version.content = sanitizeHtmlOnServer(version.content);
      }

      return (
        <div className={enableDefaultFontFamily ? "default-font-family" : undefined}>
          <PublishEncryptedWrapper documentInfo={documentInfo} version={version}>
            <PublishVersionContent document={documentInfo} version={version} />
          </PublishEncryptedWrapper>
          <input
            type="hidden"
            data-testid="revalidate-timestamp"
            value={String(revalidateTimestamp)}
          />
        </div>
      );
    } catch (error) {
      if (error instanceof BasicError && (error.errorCode === 400 || error.errorCode === 422)) {
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

    const message: any = error instanceof Error ? error.message : "خطای نامشخصی رخ داد";
    let errorMsg = typeof message === "string" ? message : message.message;

    if (
      errorMsg === "NEXT_NOT_FOUND" ||
      errorMsg.includes("NEXT_HTTP_ERROR_FALLBACK") ||
      errorMsg.includes("404")
    ) {
      errorMsg = "آدرس وارد شده صحیح نیست.";
    }

    if (documentInfo! && documentInfo.hasWhiteList && errorCode === 403) {
      return <PublishDocumentAccessWrapper repoId={documentInfo.repoId} docId={documentInfo.id} />;
    }

    if ((error as unknown as IActionError).errorCode === 401) {
      return (
        <LoginRequiredButton
          message="ورود"
          description="برای دسترسی به سند لطفا با استفاده از درگاه پاد لاگین کنید."
        />
      );
    }
    return (
      <section className="main bg-slate-50 grid h-[calc(100vh-156px)] w-full place-items-center justify-items-center text-center">
        <div className="flex flex-col items-center justify-center">
          <FolderEmptyIcon />
          <p>{errorMsg}</p>
        </div>
      </section>
    );
  }
}
