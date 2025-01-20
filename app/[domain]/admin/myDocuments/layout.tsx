import type { Metadata } from "next";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "سندهای من",
  description: "پنل مدیریت محتوا",
};

const MyDocumentsLayout = ({ children }: IProps) => {
  return children;
};

export default MyDocumentsLayout;
