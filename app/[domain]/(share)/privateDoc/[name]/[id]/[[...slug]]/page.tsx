import React from "react";
import { getDocumentPublishLink, getPublishedDocumentLastVersion, getPublishedDocumentVersion } from "@service/clasor";
import { FolderEmptyIcon } from "@components/atoms/icons";
import { notFound } from "next/navigation";
import Logger from "@utils/logger";
import PublishVersionContent from "@components/pages/publish";
import { hasEnglishDigits, toEnglishDigit } from "@utils/index";
import BasicError, { AuthorizationError, ServerError } from "@utils/error";
import RedirectPage from "@components/pages/redirectPage";
import { getMe } from "@actions/auth";
import PublishDocumentPassword from "@components/pages/publish/publishDocumentPassword";
import { cookies } from "next/headers";
import { IActionError } from "@interface/app.interface";
import LoginRequiredButton from "@components/molecules/loginRequiredButton";

export const generateStaticParams = async () => {
    return [];
};

interface PageParams {
    name: string;
    id: string;
    slug: string[];
}

async function fetchDocumentVersion(
    documentId: number,
    versionId: number | undefined,
    documentPassword?: string,
    accessToken?: string
) {
    if (versionId) {
        return getPublishedDocumentVersion(
            accessToken!,
            documentId,
            versionId,
            documentPassword,
        );
    }

    const lastVersion = await getPublishedDocumentLastVersion(
        accessToken!,
        documentId,
        documentPassword,
    );

    if (!lastVersion?.id) {
        throw new ServerError(["سند مورد نظر فاقد نسخه می باشد."]);
    }

    return getPublishedDocumentVersion(
        accessToken!,
        documentId,
        lastVersion.id,
        documentPassword,
    );
}


export default async function  PrivateSharePage ({ params,
}: {
    params: PageParams;
}) {
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

        const lastSlug = enSlug[enSlug.length - 1];
        const hasVersion = lastSlug.startsWith("v-");
        const documentId = parseInt(hasVersion ? enSlug[1] : lastSlug, 10);
        const documentName = enSlug[0];

        const versionId = hasVersion
            ? parseInt(lastSlug.replace("v-", ""), 10)
            : undefined;


        if (!documentId || Number.isNaN(documentId)) {
            return notFound();
        }

        const documentInfo = await getDocumentPublishLink(undefined,+documentId!, false);
        const documentInfoName = documentInfo.name.replaceAll(/\s+/g, "-");

        if (documentInfo.isHidden || toEnglishDigit(documentInfoName) !== documentName) {
            return notFound();
        }

        if (
            !documentInfo?.hasPassword &&
            !documentInfo?.hasWhiteList &&
            !documentInfo?.hasBlackList
        ) {
            const publicSlug = slug?.join("/").replace("/privateDoc", "");
            return (
                <RedirectPage
                    redirectUrl={`/share/${name}/${id}/${publicSlug}`}
                />
            );
        }


        // check password cookie 
        // caution: reading cookies will cause server side rendering
        const documentPassword = cookies().get(`document-${documentId}-password`)?.value;

        const encodedToken = cookies().get("token")?.value;
        let accessToken: string | undefined;

        if ((documentInfo?.hasWhiteList || documentInfo?.hasBlackList) && !encodedToken) {
            throw new AuthorizationError();
        } else if ((documentInfo?.hasWhiteList || documentInfo?.hasBlackList) && encodedToken) {
            const userInfo = await getMe();
            accessToken =
                userInfo && !("error" in userInfo) ? userInfo.access_token : undefined;
        }

        if (documentInfo?.hasPassword && !documentPassword) {
            return <PublishDocumentPassword documentId={documentId} />;
        }
        try {
            const version = await fetchDocumentVersion(
                documentId,
                hasVersion ? versionId : undefined,
                documentPassword || undefined,
                accessToken
            );

            const versionNumber = enSlug[enSlug.length - 2];
            if (hasVersion && version && toEnglishDigit(version.versionNumber).replaceAll(/\s+/g, "-") !== versionNumber) {
                return notFound();
            }

            if (!version) {
                return notFound();
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

        const message = error instanceof Error ? error.message : "خطای نامشخصی رخ داد";
        if ((error as unknown as IActionError).errorCode === 401) {
            return <LoginRequiredButton message="ورود" description="برای دسترسی به سند لطفا با استفاده از درگاه پاد لاگین کنید." />;
        }
        if (message === "NEXT_NOT_FOUND") {
            return notFound();
        }
        return (
            <section className="main w-full h-[calc(100vh-156px)] text-center bg-slate-50 grid justify-items-center place-items-center">
                <div className="flex flex-col justify-center items-center">
                    <FolderEmptyIcon />
                    <p>{message}</p>
                </div>
            </section>
        );
    }
};
