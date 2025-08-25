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
  let domain: string = "";

  if (isDev) {
    domain = process.env.DOMAIN || "";
  } else {
    domain = decodeKey(params.domain);
  }

  const { content } = await getCustomPostByDomain(domain);
  const domainInfo = JSON.parse(content ?? "{}") as ICustomPostData;

  return (
    <ErrorBoundary>
      <BaseTemplate domainInfo={domainInfo}>{children}</BaseTemplate>
    </ErrorBoundary>
  );
};

export default AdminLayout;
