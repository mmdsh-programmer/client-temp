import ErrorBoundary from "@components/errorBoundry";
import { ICustomPostData } from "@interface/app.interface";
import type { Metadata } from "next";
import React from "react";
import RepositoryTemplate from "@components/templates/repositoryTemplate";
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
  title: " مخزن",
  description: "پنل مدیریت محتوا",
};

const RepositoryLayout = async ({ children, params }: IProps) => {
  const { domain } = params;
  const { data } = await getCustomPostByDomain(decodeKey(domain));
  const domainInfo = JSON.parse(data ?? "{}") as ICustomPostData;

  return (
    <ErrorBoundary>
      <Tour />
      <RepositoryTemplate domainInfo={domainInfo}>{children}</RepositoryTemplate>
    </ErrorBoundary>
  );
};

export default RepositoryLayout;
