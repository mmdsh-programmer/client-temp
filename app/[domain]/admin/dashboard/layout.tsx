import React from "react";
import ErrorBoundary from "@components/errorBoundry";
import type { Metadata } from "next";
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
      {children}
    </ErrorBoundary>
  );
};

export default DashboardLayout;
