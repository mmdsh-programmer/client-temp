import React from "react";
import { decodeKey } from "@utils/index";

export async function generateStaticParams() {
  return [];
}
interface IProps {
  params: Promise<{
    domain: string;
  }>;
}
export default async function SlugPage({ params }: IProps) {
  const date = +new Date();
  const awaitedParams = await params;
  const { domain } = awaitedParams;

  try {
    return (
      <main className="flex h-screen flex-col items-center justify-center bg-primary">
        <h1>date: {date}</h1>
        <h1>domain: {decodeKey(decodeURIComponent(domain))}</h1>
      </main>
    );
  } catch {
    return (
      <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
        <h1>Error</h1>
      </div>
    );
  }
}
