import type { Metadata } from "next";
import React from "react";

interface IProps {
  children: React.ReactNode;
  params: {
    domain: string;
  };
}

export const metadata: Metadata = {
  title: "سندهای اشتراکی",
  description: "پنل مدیریت محتوا",
};

const SharedDocumentsLayout = ({ children }: IProps) => {
  return children;
};

export default SharedDocumentsLayout;
