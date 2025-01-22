"use client";

import React, { Suspense } from "react";

import CheckRepoInfo from "@components/templates/checkRepoInfo";
import EditPage from "@components/pages/edit";
import { useSearchParams } from "next/navigation";

const Edit = () => {
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  return (
    <Suspense>
      <div className="h-screen">
        {sharedDocuments === "true" ? (
          <EditPage />
        ) : (
          <CheckRepoInfo>
            <EditPage />
          </CheckRepoInfo>
        )}
      </div>
    </Suspense>
  );
};

export default Edit;
