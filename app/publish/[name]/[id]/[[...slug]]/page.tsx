import { IRepo } from "@interface/repo.interface";
import { IVersion } from "@interface/version.interface";
import React from "react";
import RepositoryInfo from "@components/organisms/repositoryInfo";
import {
  getPublishRepositoryInfo,
} from "@service/clasor";
import { notFound } from "next/navigation";
import { toEnglishDigit } from "@utils/index";

export interface IPublishProps {
  uniqueId: number;
  repoId: number;
  repoName: string;
  repository?: IRepo;
  error?: { status: number; messages: string[] };
  data?: IVersion;
}

async function getRepositoryData (repoId: number) {
  if (!repoId || Number.isNaN(Number(repoId))) {
     return notFound();
  }
  const repoInfoResponse = await getPublishRepositoryInfo(+repoId);
  if(!repoInfoResponse){
    return notFound();
  }
  return repoInfoResponse;
}

// async function getPublishData(params: string[]) {





//   if (hasVersion) {
//     const id = params[params.length - 1].replace("v-", "");
//     if (Number.isNaN(Number(id))) {
//       return {
//         uniqueId: Date.now(),
//         repoId,
//         repoName,
//         repository: null,
//         data: null,
//       };
//     }
//     versionId = +id;
//   }

//   const index = versionId ? 3 : 1;
//   const docId = params.length === 2 ? null : params[params.length - index];



//   if (versionId && docId) {
//     const versionInfo = await getPublishDocumentVersion(
//       +repoId,
//       +docId,
//       versionId
//     );

//     return {
//       uniqueId: Date.now(),
//       repoId,
//       repoName,
//       repository: null,
//       data: versionInfo,
//     };
//   }

//   if (docId) {
//     const lastVersionResponse = await getPublishDocumentLastVersion(
//       +repoId,
//       +docId
//     );

//     if (lastVersionResponse) {
//       const response = await getPublishDocumentVersion(
//         +repoId,
//         +docId,
//         lastVersionResponse.id
//       );

//       return {
//         uniqueId: Date.now(),
//         repoId,
//         repoName,
//         repository: null,
//         data: response,
//       };
//     }
//   }

//   return {
//     uniqueId: Date.now(),
//     repoId,
//     repoName,
//     repository: null,
//     data: null,
//   };
// }

export default async function PublishContentPage({
  params,
}: {
  params: { name: string; id: string; slug: string[] };
}) {
  try {
    const { name, id, slug } = params;
    const repository = await getRepositoryData(Number.parseInt(toEnglishDigit(decodeURIComponent(id)), 10));
    if(!slug){
     return <RepositoryInfo repository={repository} />;
    }

    const hasVersion = (slug[slug.length - 1] as string).startsWith("v-");
    // const docId = params.length === 2 ? null : params[params.length - index];

    if(!hasVersion){
      return notFound();
    }

    const versionId = slug[slug.length - 1].replace("v-", "");
    if (!versionId || Number.isNaN(Number(versionId))) {
      return notFound();
    }

    // const { repository } =
    //   await getPublishData(params.slug);
    if (!slug) {
      return <div>no slug</div>;
    }

    return <div className="flex flex-col">
      <span>name: {decodeURIComponent(name)}</span>
       <span>id: {decodeURIComponent(id)}</span> 
       <span>slug: {JSON.stringify(slug)}</span>
      </div>;
    
  } catch (error) {
    const errorMessage = Array.isArray((error as { messages?: string[] })?.messages)
      ? (error as { messages?: string[] })?.messages?.[0]
      : JSON.stringify(error);

    return (
      <div className="main w-full min-h-screen text-center bg-slate-50 flex items-center justify-center">
        {errorMessage}
      </div>
    );
  }
}
