import ErrorBoundary from "@components/errorBoundry";
import type { Metadata } from "next";
import React from "react";
import Tour from "@components/tour";

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
      {children}
    </ErrorBoundary>
  );
};

export default SharedDocumentsLayout;
