import React from "react";
import type { Metadata } from "next";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "مدیریت سازمانی",
  description: "پنل مدیریت محتوا",
};

const BranchManagementLayout = ({ children }: IProps) => {
  return children;
};

export default BranchManagementLayout;
