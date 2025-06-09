import { getPublishDocumentCustomPost, getPublishRepositoryInfo } from "@service/clasor";
import { ISeo } from "@interface/social.interface";
import { toEnglishDigit, toPersianDigit, hasEnglishDigits } from "@utils/index";
import { notFound } from "next/navigation";

export async function getSeoConfig(documentId: number): Promise<ISeo | null> {
  try {
    const documentCustomPost = await getPublishDocumentCustomPost(documentId) as { content: string | null };
    if (!documentCustomPost.content) return null;
    return JSON.parse(documentCustomPost.content) as ISeo;
  } catch {
    return null;
  }
}

export async function getDocumentMetadata(params: {
  id: string;
  name: string;
  slug?: string[];
  domain?: string;
}) {
  const { id, name, slug } = params;

  const decodeId = decodeURIComponent(id);
  if (hasEnglishDigits(decodeId)) throw new Error("Invalid address");

  const repoId = parseInt(toEnglishDigit(decodeId), 10);
  if (Number.isNaN(repoId)) throw new Error("Invalid repo id");

  if (slug?.some((s) => {
    return hasEnglishDigits(decodeURIComponent(s));
  })) throw new Error("Invalid address");
  const enSlug = slug?.map((s) => {
    return toEnglishDigit(decodeURIComponent(s));
  });

  const repository = await getPublishRepositoryInfo(repoId);

  const decodeName = decodeURIComponent(name);
  const repoName = toPersianDigit(repository.name).replaceAll(/\s+/g, "-");
  if (decodeName !== repoName) return notFound();

  if (!enSlug?.length) {
    return { title: repository.name };
  }

  const lastSlug = enSlug[enSlug.length - 1];
  const hasVersion = lastSlug.startsWith("v-");
  const documentId = parseInt(hasVersion ? enSlug[1] : lastSlug, 10);
  const documentName = enSlug[0].replaceAll("-", " ");

  if (!documentId || Number.isNaN(documentId)) {
    return { title: "بلاگ باکس" };
  }

  const pageSeoConfig = await getSeoConfig(documentId);

  return {
    title: pageSeoConfig?.title || documentName || "بلاگ باکس",
    description: pageSeoConfig?.description || "",
    keywords: pageSeoConfig?.keywords || "",
    openGraph: pageSeoConfig?.openGraph || {},
    other: {
      ...(pageSeoConfig?.seoIndexing && {
        robots: `${pageSeoConfig.seoIndexing.indexing}, ${pageSeoConfig.seoIndexing.following}${pageSeoConfig.seoIndexing.noarchive ? ", noarchive" : ""}${pageSeoConfig.seoIndexing.nosnippet ? ", nosnippet" : ""}`,
      }),
      ...(pageSeoConfig?.canonicalUrl && {
        canonical: pageSeoConfig.canonicalUrl,
      }),
    },
  };
} 