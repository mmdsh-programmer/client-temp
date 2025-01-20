import type { Metadata } from "next";
import React from "react";
import RepositoryTemplate from "@components/templates/repositoryTemplate";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: " مخزن",
  description: "پنل مدیریت محتوا",
};

const RepositoryLayout = ({ children }: IProps) => {

  return  <RepositoryTemplate>{children}</RepositoryTemplate>;
};

export default RepositoryLayout;
