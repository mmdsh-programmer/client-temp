import React, { Suspense } from "react";

import EditPage from "@components/pages/edit";
import CheckRepoInfo from "@components/templates/checkRepoInfo";

const Edit = () => {
  return (
    <Suspense>
      <CheckRepoInfo>
        <EditPage />
      </CheckRepoInfo>
    </Suspense>
  );
};

export default Edit;
