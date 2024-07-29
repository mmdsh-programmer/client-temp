"use client";

import React from "react";
import DashboardPage from "@components/pages/dashboard";
import DashboardTemplate from "@components/templates/dashboardTemplate";

const Dashboard = () => {
  return (
    <DashboardTemplate>
      <DashboardPage />
    </DashboardTemplate>
  );
};

export default Dashboard;
