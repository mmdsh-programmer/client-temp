import React from "react";
import MyDocumentsPage from "@components/pages/myDocuments";
import CheckPanelUrlData from "@components/templates/checkPanelUrlData";

const MyDocuments = () => {
  return (
    <>
      <CheckPanelUrlData />
      <MyDocumentsPage />
    </>
  );
};

export default MyDocuments;
