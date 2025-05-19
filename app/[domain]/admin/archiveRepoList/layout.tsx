import type { Metadata } from "next";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "مخزن‌های بایگانی‌شده",
  description: "لیست مخزن‌های بایگانی‌شده",
};

const ArchiveRepoLayout = ({ children }: IProps) => {
  return children;
};

export default ArchiveRepoLayout;
