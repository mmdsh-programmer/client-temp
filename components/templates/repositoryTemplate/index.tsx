"use client";

import CheckPanelUrlData from "../checkPanelUrlData";
import CheckRepoInfo from "../checkRepoInfo";
import React from "react";
import dynamic from "next/dynamic";

interface IProps {
  children: React.ReactNode;
}


const RepoLogComponent = dynamic(
  () => {
    return import("@components/organisms/repoLog");
  },
  {
    loading: () => {
      return <p className="w-full text-center">در حال بارگذاری...</p>;
    },
    ssr: false,
  },
);

const RepositoryTemplate = ({ children }: IProps) => {
  return (

    <>
      <CheckPanelUrlData />
      <CheckRepoInfo>
        <div className="w-full">{children}</div>
        <RepoLogComponent />
      </CheckRepoInfo>
    </>
  );
};

export default RepositoryTemplate;
