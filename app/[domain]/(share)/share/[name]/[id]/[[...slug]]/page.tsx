import { getDocumentPublishLink, getPublishedDocumentLastVersion, getPublishedDocumentVersion } from "@service/clasor";
import { hasEnglishDigits, toEnglishDigit } from "@utils/index";

import { FolderEmptyIcon } from "@components/atoms/icons";
import { IVersion } from "@interface/version.interface";
import Logger from "@utils/logger";
import PublishVersionContent from "@components/pages/publish";
import React from "react";
import RedirectPage from "@components/pages/redirectPage";
import { ServerError } from "@utils/error";
import { generateCachePageTag } from "@utils/redis";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
    return [];
};

interface PageParams {
    domain: string;
    name: string;
    id: string;
    slug: string[];
}

const SharePage = async ({ params,
}: {
    params: PageParams;
}) => {
    try {
        const { id, name, slug, domain } = params;

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

        const versionId = hasVersion
            ? parseInt(lastSlug.replace("v-", ""), 10)
            : undefined;

            if (!documentId || Number.isNaN(documentId)) {
                await generateCachePageTag([
                  `dc-ph-${documentId}`,
                  `i-${domain}`,
                ]);
                return notFound();
              }

        const documentInfo = await getDocumentPublishLink(undefined,+documentId!, false);
        const documentInfoName = documentInfo.name.replaceAll(/\s+/g, "-");

        if (documentInfo.isHidden || toEnglishDigit(documentInfoName) !== documentName) {
            await generateCachePageTag([
                `dc-ph-${documentId}`,
                `i-${domain}`,
              ]);
            return notFound();
        }

        if (
            documentInfo?.hasPassword ||
            documentInfo?.hasWhiteList ||
            documentInfo?.hasBlackList
          ) {
            const privatePath = `/privateDoc/${name}/${id}/${slug?.join("/")}`;
            return <RedirectPage redirectUrl={privatePath} />;
          }

        let versionData: IVersion;

        if (hasVersion && versionId && !Number.isNaN(versionId)) {
            versionData = await getPublishedDocumentVersion(
                undefined,
                +documentId!,
                versionId
            );
        } else {
            const lastVersionInfo = await getPublishedDocumentLastVersion(
                undefined,
                 +documentId!
            );
            if (!lastVersionInfo) {
                await generateCachePageTag([
                    `dc-ph-${documentId}`,
                    `i-${domain}`,
                  ]);
                throw new ServerError(["سند مورد نظر فاقد آخرین نسخه می باشد."]);

            }
            versionData = await getPublishedDocumentVersion(
                undefined,
                +documentId!,
                lastVersionInfo!.id
            );

        }

        const versionNumber = enSlug[enSlug.length - 2];
        await generateCachePageTag([
            `vr-${versionData.id}`,
            `dc-ph-${documentId}`,
            `i-${domain}`,
          ]);
        if (
            hasVersion &&
            versionData &&
            toEnglishDigit(versionData.versionNumber).replaceAll(/\s+/g, "-") !==
            versionNumber
        ) {
            return notFound();
        }

        return (
            <PublishVersionContent document={documentInfo} version={versionData} />
        );
    } catch (error) {

        const { errorList, errorCode } = error as unknown as {
            errorList: string[];
            errorCode: number;
        };
        Logger.error(JSON.stringify({
            errorList,
            errorCode,
            error: true,
            referenceNumber: "NOT_DEFINED",
        }, null, 0));

        const message =
            error instanceof Error ? error.message : "خطای نامشخصی رخ داد";
        if (message === "NEXT_NOT_FOUND") {
            return notFound();
        }
        return (
            <section className="main w-full h-[calc(100vh-81px)] text-center bg-slate-50 grid justify-items-center place-items-center">
                <div className="flex flex-col justify-center items-center">
                    <FolderEmptyIcon />
                    <p>{message}</p>
                </div>
            </section>
        );
    }
};

export default SharePage;
