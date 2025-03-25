import React from "react";
import { getPublishDocumentInfo, getPublishDocumentLastVersion, getPublishDocumentVersion, getPublishRepositoryInfo } from "@service/clasor";
import { IVersion } from "@interface/version.interface";
import { FolderEmptyIcon } from "@components/atoms/icons";
import { notFound } from "next/navigation";
import Logger from "@utils/logger";
import PublishVersionContent from "@components/pages/publish";
import { hasEnglishDigits, toEnglishDigit, toPersianDigit } from "@utils/index";
import { ServerError } from "@utils/error";
import RedirectPage from "@components/pages/redirectPage";

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
        const { id, name, slug } = params;

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

        const repository = await getPublishRepositoryInfo(repoId);

        const decodeName = decodeURIComponent(name);
        const repoName = toPersianDigit(repository.name).replaceAll(/\s+/g, "-");
        if (decodeName !== repoName) {
            return notFound();
        }

        const lastSlug = enSlug[enSlug.length - 1];
        const hasVersion = lastSlug.startsWith("v-");
        const documentId = parseInt(hasVersion ? enSlug[1] : lastSlug, 10);
        const documentName = enSlug[0];

        const versionId = hasVersion
            ? parseInt(lastSlug.replace("v-", ""), 10)
            : undefined;

        const documentInfo = await getPublishDocumentInfo(+repoId!, +documentId!, true);
        const documentInfoName = documentInfo.name.replaceAll(/\s+/g, "-");

        if (documentInfo.isHidden || toEnglishDigit(documentInfoName) !== documentName) {
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
            versionData = await getPublishDocumentVersion(
                +repoId!, +documentId!,
                versionId
            );
        } else {
            const lastVersionInfo = await getPublishDocumentLastVersion(
                +repoId!, +documentId!
            );
            if (!lastVersionInfo) {
                throw new ServerError(["سند مورد نظر فاقد آخرین نسخه می باشد."]);

            }
            versionData = await getPublishDocumentVersion(
                +repoId!, +documentId!,
                lastVersionInfo!.id
            );

        }

        const versionNumber = enSlug[enSlug.length - 2];


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
        }));

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
