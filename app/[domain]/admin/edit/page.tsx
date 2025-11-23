"use client";

import React, { Suspense } from "react";
import CheckRepoInfo from "@components/templates/checkRepoInfo";
import EditPage from "@components/pages/edit";
import { useSearchParams } from "next/navigation";
import { Metadata } from "next/types";

// export async function generateMetadata({ searchParams }): Promise<Metadata> {
//   const { repoId } = searchParams;
//   try {
//     // const userInfo = await getMe();
//     // const response = await getRepository(userInfo.access_token, repoId);

//     // return {
//     //   title: response.name,
//     //   description: "",
//     // };
//   } catch {
//     return {
//       title: "مخزن",
//       description: "",
//     };
//   }
// }

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
