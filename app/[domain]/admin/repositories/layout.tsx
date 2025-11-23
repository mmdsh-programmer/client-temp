import React from "react";
import RepositoryTemplate from "@components/templates/repositoryTemplate";

interface IProps {
  children: React.ReactNode;
}

const RepositoryLayout = async ({ children }: IProps) => {
  return <RepositoryTemplate>{children}</RepositoryTemplate>;
};

export default RepositoryLayout;
