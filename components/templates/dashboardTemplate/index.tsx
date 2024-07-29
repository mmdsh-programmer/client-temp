import React from "react";
import MainTemplate from "../mainTemplate";

interface IProps {
  children: React.ReactNode;
}

const DashboardTemplate = ({ children }: IProps) => {
  return <MainTemplate>{children}</MainTemplate>;
};

export default DashboardTemplate;
