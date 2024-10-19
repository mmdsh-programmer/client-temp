import "../styles/globals.css";

import type { Metadata } from "next";
import Providers from "../provider";
import React from "react";
import ThemeLoader from "provider/themeLoader";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "کلاسور",
  description: "کلاسور",
};



const RootLayout = ({ children }: IProps) => {
  return (
    <html lang="fa">
        {/* @ts-expect-error Async Server Component */}
        <ThemeLoader>
          <Providers>{children}</Providers>
        </ThemeLoader>
    </html>
  );
};

export default RootLayout;
