import {
  getPublishDocumentInfo,
  getPublishDocumentLastVersion,
  getPublishDocumentVersion,
  getPublishRepositoryInfo,
} from "@service/clasor";
import { hasEnglishDigits, toEnglishDigit, toPersianDigit } from "@utils/index";

import { FolderEmptyIcon } from "@components/atoms/icons";
import { IVersion } from "@interface/version.interface";
import PublishVersionContent from "@components/pages/publish";
import React from "react";
import RedirectPage from "@components/pages/redirectPage";
import RepositoryInfo from "@components/organisms/repositoryInfo";
import { ServerError } from "@utils/error";
import { generateCachePageTag } from "@utils/redis";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
   return [];
};

type PageParams = {
  domain: string;
  name: string;
  id: string;
  slug?: string[];
};

export default async function PublishContentPage({
  params,
}: {
  params: PageParams;
}) {
  const time = Date.now();
  try {
    const { id, name, slug, domain } = params;

    const decodeId = decodeURIComponent(id);
    if(hasEnglishDigits(decodeId)){
      throw new ServerError(["آدرس وارد شده نامعتبر است"]);
    }
    
    const repoId = parseInt(toEnglishDigit(decodeId), 10);
    
    if (Number.isNaN(repoId)) {
      throw new ServerError(["آیدی مخزن صحیح نیست"]);
    }
    
    // Check for English digits in slug before converting 
    if (slug?.some(s => {return hasEnglishDigits(decodeURIComponent(s));})) {
      throw new ServerError(["آدرس وارد شده نامعتبر است"]);
    }

    const enSlug = slug?.map(s => {return toEnglishDigit(decodeURIComponent(s));});

    const repository = await getPublishRepositoryInfo(repoId);

    const decodeName = decodeURIComponent(name);
    const repoName = toPersianDigit(repository.name).replaceAll(/\s+/g, "-");
    if(decodeName !== repoName){
      return notFound();
    }

    if (!enSlug?.length) {
      await generateCachePageTag([`rp-ph-${repository.id}`,`i-${domain}`]);
      return <RepositoryInfo repository={repository} />;
    }

    const lastSlug = enSlug[enSlug.length - 1];
    const hasVersion = lastSlug.startsWith("v-");
    const documentId = parseInt(
      hasVersion ? enSlug[1] : lastSlug,
      10
    );
    const documentName = enSlug[0];

    const versionId = hasVersion
      ? parseInt(lastSlug.replace("v-", ""), 10)
      : undefined;

    let versionData: IVersion;
    if (!documentId || Number.isNaN(documentId)) {
      await generateCachePageTag([`dc-${documentId}`,`rp-ph-${repository.id}`,`i-${domain}`]);
      return notFound();
    }

    const documentInfo = await getPublishDocumentInfo(
      repoId,
      documentId,
      true
    );

    const documentInfoName = documentInfo.name.replaceAll(/\s+/g, "-");
    if(toEnglishDigit(documentInfoName) !== documentName){
      await generateCachePageTag([`dc-${documentId}`,`rp-ph-${repository.id}`,`i-${domain}`]);
      return notFound();
    }

    if (
      documentInfo?.hasPassword ||
      documentInfo?.hasWhiteList ||
      documentInfo?.hasBlackList
    ) {
      // CHECK THE CACHE
      const privatePath = `/private/${name}/${id}/${slug?.join("/")}`;
      return <RedirectPage redirectUrl={privatePath} />;
    }

    if (hasVersion && versionId && !Number.isNaN(versionId)) {
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

      if (!lastVersionInfo){
        await generateCachePageTag([`dc-${documentId}`,`rp-ph-${repository.id}`,`i-${domain}`]);
        throw new ServerError(["سند مورد نظر فاقد آخرین نسخه میباشد."]);
      }

      versionData = await getPublishDocumentVersion(
        repository.id,
        documentId,
        lastVersionInfo.id
      );
    }

    const versionNumber = enSlug[enSlug.length - 2];

    await generateCachePageTag([`vr-${versionData.id}`,`dc-${documentId}`,`rp-ph-${repository.id}`,`i-${domain}`]);
    
    if(hasVersion && versionData && toEnglishDigit(versionData.versionNumber).replaceAll(/\s+/g, "-") !== versionNumber){
      return notFound();
    }

    return (
      <>
        <h1 className="fixed top-0 left-0 font-bold text-red-500">{time}</h1>
        <PublishVersionContent document={documentInfo} version={versionData} />
      </>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "خطای نامشخصی رخ داد";
    if(message === "NEXT_NOT_FOUND"){
       return notFound();
    }
    return (
      <section className="main w-full h-[calc(100vh-81px)] text-center bg-slate-50 grid justify-items-center place-items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="fixed top-0 left-0 font-bold text-red-500">{time}</h1>
          <FolderEmptyIcon />
          <p>{message}</p>
        </div>
      </section>
    );
  }
}
