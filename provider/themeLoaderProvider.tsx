import { ICustomPostData, IThemeInfo } from "@interface/app.interface";

import React from "react";
import { decodeKey } from "@utils/index";
import { getCustomPostByDomain } from "@service/clasor";
import localFont from "next/font/local";

interface IProps {
  children: React.ReactNode;
  domain: string;
}

// main font for the app
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

const ThemeLoaderProvider = async ({ children, domain }: IProps) => {
  const domainHash = decodeKey(domain);
  const { content } = await getCustomPostByDomain(domainHash);
  const { theme } = JSON.parse(content ?? "{}") as ICustomPostData;

  return (
    <body
      className={`${iranYekanFont.variable} !font-iranYekan h-full w-full`}
      style={theme as IThemeInfo}
    >
      {children}
    </body>
  );
};

export default ThemeLoaderProvider;
