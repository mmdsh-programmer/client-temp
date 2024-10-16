import DashboardTemplate from "@components/templates/dashboardTemplate";
import ErrorBoundary from "@components/errorBoundry";
import type { Metadata } from "next";
import React from "react";
import Tour from "@components/tour";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: " داشبورد",
  description: "پنل مدیریت محتوا",
};

const DashboardLayout = ({ children }: IProps) => {
  return (
    <ErrorBoundary> 
    <Tour />
    <DashboardTemplate>
      {children}
    </DashboardTemplate>
  </ErrorBoundary>
  );
};

export default DashboardLayout;
