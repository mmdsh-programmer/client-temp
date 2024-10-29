import React from "react";
import { decodeKey } from "@utils/index";

export async function generateStaticParams() {
  return [];
}
interface IProps {
  params: {
    domain: string;
  };
}
export default function SlugPage({ params }: IProps) {
  const date = +new Date();
  try {
    return (
      <main className="flex h-screen flex-col items-center justify-center bg-primary">
        <h1>date: {date}</h1>
        <h1>domain: {decodeKey(decodeURIComponent(params.domain))}</h1>
      </main>
    );
  } catch {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1>Error</h1>
      </div>
    );
  }
}
