import React from "react";
import AdminPanelFeedback from "@components/organisms/adminPanel/adminPanelFeedback";
import AdminPanelReport from "@components/organisms/adminPanel/adminPanelReport";

const AdminPanelPage = () => {
  return (
    <div className="flex flex-col gap-0 xs:gap-6">
      <AdminPanelReport />
      <AdminPanelFeedback />
    </div>
  );
};

export default AdminPanelPage;
