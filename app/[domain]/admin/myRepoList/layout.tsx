import type { Metadata } from "next";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "مخزن‌های من",
  description: "لیست مخزن‌های من",
};

const MyRepoLayout = ({ children }: IProps) => {
  return children;
};

export default MyRepoLayout;
