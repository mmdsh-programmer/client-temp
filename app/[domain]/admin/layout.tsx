import BaseTemplate from "@components/templates/baseTemplate";
import ErrorBoundary from "@components/errorBoundry";
import { ICustomPostData } from "@interface/app.interface";
import React from "react";
import { decodeKey } from "@utils/index";
import { getCustomPostByDomain } from "@service/social";

interface IProps {
  children: React.ReactNode;
  params: {
    domain: string;
  };
}

const AdminLayout = async ({ children, params }: IProps) => {
  const { domain } = params;
  const { data } = await getCustomPostByDomain(decodeKey(domain));
  const domainInfo = JSON.parse(data ?? "{}") as ICustomPostData;
  
  return (
    <ErrorBoundary>
      <BaseTemplate domainInfo={domainInfo}>{children}</BaseTemplate>
    </ErrorBoundary>
  );
};

export default AdminLayout;
