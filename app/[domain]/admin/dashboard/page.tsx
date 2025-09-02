import DashboardPage from "@components/pages/dashboard";
import CheckPanelUrlData from "@components/templates/checkPanelUrlData";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <CheckPanelUrlData />
      <DashboardPage />
    </>
  );
};

export default Dashboard;
