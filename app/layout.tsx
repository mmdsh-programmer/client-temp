import React from "react";
import localFont from "next/font/local";
import { DirectionProvider } from "@components/ui/direction";
import { TooltipProvider } from "@components/ui/tooltip";

import "../styles/globals.css";

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

const RootLayout = async ({ children }: IProps) => {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${iranYekanFont.variable} h-full w-full bg-white !font-iranYekan`}>
        <DirectionProvider direction="rtl">
          <TooltipProvider>{children}</TooltipProvider>
        </DirectionProvider>
        <p className="absolute top-0 -z-50 opacity-0">Clasor client is up and running</p>
      </body>
    </html>
  );
};

export default RootLayout;
