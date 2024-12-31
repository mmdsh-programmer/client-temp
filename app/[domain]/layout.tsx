import "@styles/globals.css";

import { LayoutTransition } from "provider/layoutTransition";
import type { Metadata } from "next";
import Providers from "provider";
import React from "react";
import ThemeLoader from "provider/themeLoader";

interface IProps {
  children: React.ReactNode;
  params: {
    domain: string;
  };
}

export const metadata: Metadata = {
  title: "کلاسور",
  description: "کلاسور",
};

const RootLayout = ({ children, params }: IProps) => {
  return (
    <html lang="fa">
      <ThemeLoader domain={params.domain}>
      <Providers>
          <LayoutTransition
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </LayoutTransition>
        </Providers>
      </ThemeLoader>
    </html>
  );
};

export default RootLayout;
