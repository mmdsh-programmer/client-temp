import DocumentsTemplate from "@components/templates/documentsTemplate";
import ErrorBoundary from "@components/errorBoundry";
import { ICustomPostData } from "@interface/app.interface";
import type { Metadata } from "next";
import React from "react";
import Tour from "@components/tour";
import { decodeKey } from "@utils/index";
import { getCustomPostByDomain } from "@service/social";

interface IProps {
  children: React.ReactNode;
  params: {
    domain: string;
  };
}

export const metadata: Metadata = {
  title: "سندهای اشتراکی",
  description: "پنل مدیریت محتوا",
};

const SharedDocumentsLayout = async ({ children, params }: IProps) => {
  const { domain } = params;
  const { data } = await getCustomPostByDomain(decodeKey(domain));
  const domainInfo = JSON.parse(data ?? "{}") as ICustomPostData;

  return (
    <ErrorBoundary>
      <Tour />
      <DocumentsTemplate domainInfo={domainInfo}>{children}</DocumentsTemplate>
    </ErrorBoundary>
  );
};

export default SharedDocumentsLayout;
