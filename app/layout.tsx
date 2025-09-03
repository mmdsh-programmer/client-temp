import React from "react";
import { decodeKey } from "@utils/index";
import "../styles/globals.css";
import type { Metadata } from "next";
import { getCustomPostByDomain } from "@service/clasor";
import Script from "next/script";
import localFont from "next/font/local";
import { ICustomPostData, IThemeInfo } from "@interface/app.interface";

interface IProps {
  children: React.ReactNode;
  params: Promise<{
    domain: string;
  }>;
}

const iranYekanFont = localFont({
  src: [
    {
      path: "../assets/font/IRANYekanRegular.ttf",
      style: "light",
      weight: "100",
    },
    {
      path: "../assets/font/IRANYekanMedium.ttf",
      style: "medium",
      weight: "500",
    },
    {
      path: "../assets/font/IRANYekanBold.ttf",
      style: "bold",
      weight: "700",
    },
  ],
  variable: "--font-iran-yekan",
  display: "swap",
});

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

const RootLayout = async ({ children, params }: IProps) => {
  const awaitedParams = await params;
  const { domain } = awaitedParams;

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
    <html lang="fa">
      <head>
        <Script
          src="https://podlytics.sandpod.ir/tracker.js"
          data-website-id={process.env.PODLYTICS_ID}
          strategy="afterInteractive"
          defer
        />
      </head>
      <body
        className={`${iranYekanFont.variable} h-full w-full bg-white !font-iranYekan`}
        style={theme as IThemeInfo}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
