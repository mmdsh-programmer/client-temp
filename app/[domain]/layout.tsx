import React from "react";
import "@styles/globals.css";
import LayoutTransitionProvider from "provider/layoutTransition";
import MainProvider from "provider/mainProvider";
import type { Metadata } from "next";
import { decodeKey } from "@utils/index";
import { getCustomPostByDomain } from "@service/clasor";
import { ICustomPostData } from "@interface/app.interface";
import RootLayout from "@app/layout";

interface IProps {
  children: React.ReactNode;
  params: Promise<{
    domain: string;
  }>;
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const awaitedParams = await params;
  const isDev = process.env.NODE_ENV === "development";

  let domainUrl: string = "";

  if (isDev) {
    domainUrl = process.env.DOMAIN || "";
  } else {
    const domain = awaitedParams;
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

  const isDev = process.env.NODE_ENV === "development";
  let domainHash: string = "";

  if (isDev) {
    domainHash = process.env.DOMAIN || "";
  } else {
    domainHash = decodeKey(domain);
  }
  const { content } = await getCustomPostByDomain(domainHash);
  const { theme } = JSON.parse(content ?? "{}") as ICustomPostData;

  
  return (
    <RootLayout themeStyle={theme}>
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
    </RootLayout>
  );
};

export default DomainLayout;
