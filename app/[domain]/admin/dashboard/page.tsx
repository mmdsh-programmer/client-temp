import React from "react";
import DashboardPage from "@components/pages/dashboard";
import CheckPanelUrlData from "@components/templates/checkPanelUrlData";

const Dashboard = async () => {

  return (
    <>
      <CheckPanelUrlData />
      <DashboardPage />
    </>
  );
};

export default Dashboard;
