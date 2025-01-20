"use client";

import React from "react";
import ErrorBoundary from "@components/errorBoundry";
import Tour from "@components/tour";
import BaseTemplate from "@components/templates/baseTemplate";
import { usePathname } from "next/navigation";

interface IProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: IProps) => {
  const pathname = usePathname();

  if (pathname?.includes("/admin/edit")) {
    return children;
  }
  
  return (
    <ErrorBoundary>
      <Tour />
      <BaseTemplate>{children}</BaseTemplate>
    </ErrorBoundary>
  );
};

export default AdminLayout;
