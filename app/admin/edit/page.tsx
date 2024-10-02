import React, { Suspense } from "react";
import EditPage from "@components/pages/edit";
import EditorContentTemplate from "@components/templates/editContentTemplate";

const Edit = () => {
  return (
    <Suspense>
      <EditorContentTemplate>
        <EditPage />
      </EditorContentTemplate>
    </Suspense>
  );
};

export default Edit;
