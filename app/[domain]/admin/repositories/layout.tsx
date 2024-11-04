import React from "react";
import ErrorBoundary from "@components/errorBoundry";
import type { Metadata } from "next";
import Tour from "@components/tour";
import RepositoryTemplate from "@components/templates/repositoryTemplate";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: " مخزن",
  description: "پنل مدیریت محتوا",
};

const RepositoryLayout = ({ children }: IProps) => {
  return (
    <ErrorBoundary>
      <Tour />
      <RepositoryTemplate>{children}</RepositoryTemplate>
    </ErrorBoundary>
  );
};

export default RepositoryLayout;
