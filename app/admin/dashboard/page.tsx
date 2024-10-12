"use client";

import DashboardPage from "@components/pages/dashboard";
import DashboardTemplate from "@components/templates/dashboardTemplate";
import ErrorBoundary from "@components/errorBoundry";
import React from "react";
import Tour from "@components/tour";

const Dashboard = () => {
  return (
    <ErrorBoundary> 
      <Tour />
      <DashboardTemplate>
        <DashboardPage />
      </DashboardTemplate>
    </ErrorBoundary>
  );
};

export default Dashboard;
