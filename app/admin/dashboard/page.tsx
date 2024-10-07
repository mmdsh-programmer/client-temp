"use client";

import DashboardPage from "@components/pages/dashboard";
import DashboardTemplate from "@components/templates/dashboardTemplate";
import ErrorBoundary from "@components/errorBoundry";
import React from "react";

const Dashboard = () => {
  return (
    <ErrorBoundary> 
      <DashboardTemplate>
        <DashboardPage />
      </DashboardTemplate>
    </ErrorBoundary>
  );
};

export default Dashboard;
