"use client";

import React from "react";
import AdminPanelTemplate from "@components/templates/adminPanelTemplate";
import AdminPanelPage from "@components/pages/adminPanel";

const Dashboard = () => {
  return (
    <AdminPanelTemplate>
      <AdminPanelPage />
    </AdminPanelTemplate>
  );
};

export default Dashboard;
