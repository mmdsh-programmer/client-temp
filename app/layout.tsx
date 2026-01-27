import React from "react";
import "../styles/globals.css";
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

const RootLayout = async ({ children }: IProps) => {
  return (
    <html lang="fa">
      <body className={`${iranYekanFont.variable} h-full w-full bg-white !font-iranYekan`}>
        {children}
        <p className="absolute top-0 -z-50 opacity-0">Clasor client is up and running</p>
      </body>
    </html>
  );
};

export default RootLayout;
