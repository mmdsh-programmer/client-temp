import React from "react";
import "@styles/globals.css";
import LayoutTransitionProvider from "provider/layoutTransition";
import MainProvider from "provider/mainProvider";
import type { Metadata } from "next";
import ThemeLoaderProvider from "provider/themeLoaderProvider";
import { decodeKey } from "@utils/index";
import { getCustomPostByDomain } from "@service/clasor";

interface IProps {
  children: React.ReactNode;
  params: {
    domain: string;
  };
}

export async function generateMetadata({ params }): Promise<Metadata> {

  const isDev = process.env.NODE_ENV === "development";

  let domainUrl: string = "";

  if (isDev) {
    domainUrl = process.env.DOMAIN || "";
  } else {
    const domain = await params;
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
  const { domain } = await params;

  return (
    <ThemeLoaderProvider domain={domain}>
      <>
        <MainProvider>
          <LayoutTransitionProvider
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </LayoutTransitionProvider>
        </MainProvider>
        <p className="absolute -z-50 hidden">3.20.0.2-v3</p>
      </>
    </ThemeLoaderProvider>
  );
};

export default DomainLayout;
