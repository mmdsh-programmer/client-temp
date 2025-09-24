import React from "react";
import "@styles/globals.css";
import MainProvider from "provider/mainProvider";
import type { Metadata } from "next";
import { decodeKey } from "@utils/index";
import { getCustomPostByDomain } from "@service/clasor";
import { ICustomPostData } from "@interface/app.interface";
import ThemeLoaderProvider from "provider/themeLoaderProvider";

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
  console.log("------------------------ admin layout ---------------------", JSON.stringify(awaitedParams));

  try {
    const { content } = await getCustomPostByDomain(domainUrl);
    const domainInfo = JSON.parse(content ?? "{}");
      console.log(
      JSON.stringify({
        type: "domain_info:content",
        data: domainInfo,
        logo: domainInfo.logo,
        podspaceUrl: process.env.NEXT_PUBLIC_PODSPACE_API
      }),
    );
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
      <ThemeLoaderProvider theme={theme}>
        <MainProvider>
          {children}
        </MainProvider>
        <p className="absolute -z-50 hidden">3.20.4.7-v3</p>
      </ThemeLoaderProvider>
    ); 
   } catch (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-red-500">{(error as Error)?.message ?? "خطا در دریافت اطلاعات دامنه !"}</h1>
      </div>
    );
   }
};

export default DomainLayout;
