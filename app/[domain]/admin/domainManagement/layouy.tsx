import React from "react";
import type { Metadata } from "next";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "مدیریت دامنه",
  description: "پنل مدیریت محتوا",
};

const DomainManagementLayout = ({ children }: IProps) => {
  return children;
};

export default DomainManagementLayout;
