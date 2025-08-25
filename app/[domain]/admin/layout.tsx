import BaseTemplate from "@components/templates/baseTemplate";
import ErrorBoundary from "@components/errorBoundry";
import { ICustomPostData } from "@interface/app.interface";
import React from "react";
import { decodeKey } from "@utils/index";
import { getCustomPostByDomain } from "@service/clasor";

interface IProps {
  children: React.ReactNode;
  params: {
    domain: string;
  };
}

const AdminLayout = async ({ children, params }: IProps) => {
  
  const isDev = process.env.NODE_ENV === "development";
  let domainUrl: string = "";

  if (isDev) {
    domainUrl = process.env.DOMAIN || "";
  } else {
    const { domain } = await params;
    domainUrl = decodeKey(domain);
     }

  const { content } = await getCustomPostByDomain(domainUrl);
  const domainInfo = JSON.parse(content ?? "{}") as ICustomPostData;

  return (
    <ErrorBoundary>
      <BaseTemplate domainInfo={domainInfo}>{children}</BaseTemplate>
    </ErrorBoundary>
  );
};

export default AdminLayout;
