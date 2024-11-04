import { IThemeInfo } from "@interface/app.interface";
import React from "react";
import localFont from "next/font/local";
import { themeLoaderAction } from "@actions/themeLoader";

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

const ThemeLoader = async ({ children, domain }: IProps) => {
  const theme = await themeLoaderAction(domain) as IThemeInfo;
  return (
      <body
        className={`${iranYekanFont.variable} !font-iranYekan h-full w-full`}
        style={theme}
      >
        {children}
      </body>
  );
};

export default ThemeLoader;
