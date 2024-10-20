import PublishTemplate from "@components/templates/publishTemplate";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

const PublishPageLayout = ({ children }: IProps) => {
  return <PublishTemplate>{children}</PublishTemplate>;
};

export default PublishPageLayout;
