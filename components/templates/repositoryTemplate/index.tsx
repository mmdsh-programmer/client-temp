import React from "react";
import MainTemplate from "../mainTemplate";

interface IProps {
  children: React.ReactNode;
}

const RepositoryTemplate = ({ children }: IProps) => {
  return <MainTemplate>{children}</MainTemplate>;
};

export default RepositoryTemplate;
