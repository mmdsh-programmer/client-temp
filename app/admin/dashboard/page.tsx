"use client";

import React from "react";
import DashboardPage from "@components/pages/dashboard";
import DashboardTemplate from "@components/templates/dashboardTemplate";
import Tour from "@components/tour";

const Dashboard = () => {
  return (
    <DashboardTemplate>
      <Tour />
      <DashboardPage />
    </DashboardTemplate>
  );
};

export default Dashboard;
