import React from "react";
import "@styles/globals.css";
import MainProvider from "provider/mainProvider";
import type { Metadata } from "next";
import { decodeKey } from "@utils/index";
import { getCustomPostByDomain } from "@service/clasor";
import { ICustomPostData } from "@interface/app.interface";
import ThemeLoaderProvider from "provider/themeLoaderProvider";
import Script from "next/script";

interface IProps {
  children: React.ReactNode;
  params: Promise<{
    domain: string;
  }>;
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { domain } = await params;

  const isDev = process.env.DEV_MODE === "development";

  let domainUrl: string = "";

  if (isDev) {
    domainUrl = process.env.DOMAIN || "";
  } else {
    domainUrl = decodeKey(domain);
  }

  try {
    const { content } = await getCustomPostByDomain(domainUrl);
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

const DomainLayout = async ({ children, params }: IProps) => {
  try {
    const { domain } = await params;

    const isDev = process.env.DEV_MODE === "development";
    let domainHash: string = "";

    if (isDev) {
      domainHash = process.env.DOMAIN || "";
    } else {
      domainHash = decodeKey(domain);
    }
    const { content } = await getCustomPostByDomain(domainHash);
    const { theme, podlyticsHash } = JSON.parse(content ?? "{}") as ICustomPostData;

    return (
      <ThemeLoaderProvider theme={theme}>
        {podlyticsHash && process.env.NEXT_PUBLIC_PODLYTICS_ADDRESS ? (
          <Script
            src={process.env.NEXT_PUBLIC_PODLYTICS_ADDRESS}
            data-website-id={podlyticsHash}
            strategy="afterInteractive"
            defer
          />
        ) : null}
        <MainProvider>{children}</MainProvider>
        <p className="absolute -z-50 hidden">3.20.14.26-v3</p>
      </ThemeLoaderProvider>
    );
  } catch (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="text-red-500">
          {(error as Error)?.message ?? "خطا در دریافت اطلاعات دامنه !"}
        </h1>
      </div>
    );
  }
};

export default DomainLayout;
