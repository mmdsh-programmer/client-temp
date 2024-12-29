import React, { Suspense } from "react";
import EditPage from "@components/pages/edit";
import CheckRepoInfo from "@components/templates/checkRepoInfo";

const Edit = () => {
  return (
    <Suspense>
      <div className="h-screen">
        <CheckRepoInfo>
          <EditPage />
        </CheckRepoInfo>
      </div>
    </Suspense>
  );
};

export default Edit;
