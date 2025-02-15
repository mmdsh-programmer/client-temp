import "@styles/globals.css";

import LayoutTransitionProvider from "provider/layoutTransition";
import MainProvider from "provider/mainProvider";
import type { Metadata } from "next";
import React from "react";
import ThemeLoaderProvider from "provider/themeLoaderProvider";

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

const DomainLayout = ({ children, params }: IProps) => {
  return (
      <ThemeLoaderProvider domain={params.domain}>
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
          <p className="hidden absolute -z-50">3.3.0.0</p>
        </>
      </ThemeLoaderProvider>
  );
};

export default DomainLayout;
