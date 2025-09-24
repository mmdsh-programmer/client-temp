import React from "react";
import { decodeKey } from "@utils/index";
import "../styles/globals.css";
import type { Metadata } from "next";
import { getCustomPostByDomain } from "@service/clasor";
import Script from "next/script";
import localFont from "next/font/local";

interface IProps {
  children: React.ReactNode;
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
  const { domain } = await params;

  const isDev = process.env.NODE_ENV === "development";

  let domainUrl: string = "";

  if (isDev) {
    domainUrl = process.env.DOMAIN || "";
  } else {
    domainUrl = decodeKey(domain);
  }

  try {
    const { content } = await getCustomPostByDomain(domainUrl);
    const domainInfo = JSON.parse(content ?? "{}");
    console.log(
      JSON.stringify({
        type: "domain_info:content",
        data: domainInfo,
        logo: domainInfo.logo,
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

const RootLayout = async ({ children }: IProps) => {
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
      <body className={`${iranYekanFont.variable} h-full w-full bg-white !font-iranYekan`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
