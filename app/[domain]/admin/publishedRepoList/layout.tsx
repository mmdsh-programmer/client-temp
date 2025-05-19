import type { Metadata } from "next";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "مخزن‌های منتشر شده",
  description: "لیست مخزن‌های منتشر شده",
};

const PublishedRepoLayout = ({ children }: IProps) => {
  return children;
};

export default PublishedRepoLayout;
