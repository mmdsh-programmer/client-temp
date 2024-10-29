import "../styles/globals.css";

import type { Metadata } from "next";
import React from "react";

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
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
