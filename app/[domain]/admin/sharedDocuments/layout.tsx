import React from "react";
import ErrorBoundary from "@components/errorBoundry";
import type { Metadata } from "next";
import Tour from "@components/tour";
import DocumentsTemplate from "@components/templates/documentsTemplate";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "سندهای اشتراکی",
  description: "پنل مدیریت محتوا",
};

const SharedDocumentsLayout = ({ children }: IProps) => {
  return (
    <ErrorBoundary> 
      <Tour />
      <DocumentsTemplate>
        {children}
      </DocumentsTemplate>
    </ErrorBoundary>
  );
};

export default SharedDocumentsLayout;
