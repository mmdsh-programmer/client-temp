import type { Metadata } from "next";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "مخزن‌های اشتراکی",
  description: "لیست مخزن‌های اشتراکی",
};

const AccessRepoLayout = ({ children }: IProps) => {
  return children;
};

export default AccessRepoLayout;
