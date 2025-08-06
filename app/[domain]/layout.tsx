import "@styles/globals.css";

import LayoutTransitionProvider from "provider/layoutTransition";
import MainProvider from "provider/mainProvider";
import type { Metadata } from "next";
import React from "react";
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
  const domain = decodeKey(params.domain);

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

const DomainLayout = ({ children, params }: IProps) => {
  return (
    <ThemeLoaderProvider domain={params.domain}>
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
        <p className="absolute -z-50 hidden">3.19.14.34-v3</p>
      </>
    </ThemeLoaderProvider>
  );
};

export default DomainLayout;
