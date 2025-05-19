import type { Metadata } from "next";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "مخزن‌های نشان‌شده",
  description: "لیست مخزن‌های نشان‌شده",
};

const BookmarkRepoLayout = ({ children }: IProps) => {
  return children;
};

export default BookmarkRepoLayout;
