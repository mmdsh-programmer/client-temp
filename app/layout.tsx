import { decodeKey } from "@utils/index";
import "../styles/globals.css";
import type { Metadata } from "next";
import React from "react";
import { getCustomPostByDomain } from "@service/clasor";
import Script from "next/script";

interface IProps {
  children: React.ReactNode;
}
export async function generateMetadata({ params }): Promise<Metadata> {
  const isDev = process.env.NODE_ENV === "development";

  let domain: string = "";

  if (isDev) {
    domain = process.env.DOMAIN || "";
  } else {
    domain = decodeKey(params.domain);
  }

  try {
    const { content } = await getCustomPostByDomain(domain);
    const domainInfo = JSON.parse(content ?? "{}");
    return {
      title: domainInfo.projectName,
      description: domainInfo.projectDescription,
      icons: {
        icon: `${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${domainInfo.logo}?time=${Date.now()}`,
      },
    };
  } catch {
    return {
      title: "کلاسور",
      description: "کلاسور",
      icons: { icon: "/favicon.ico" },
    };
  }
}

const RootLayout = ({ children }: IProps) => {
  return (
    <html lang="fa">
      <head>
        <Script
          src="https://podlytics.sandpod.ir/tracker.js"
          data-website-id={process.env.PODLYTICS_ID}
          strategy="afterInteractive"
          defer
        />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
