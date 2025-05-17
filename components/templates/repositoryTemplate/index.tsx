"use client";

import RepoLog from "@components/organisms/repoLog";
import CheckPanelUrlData from "../checkPanelUrlData";
import CheckRepoInfo from "../checkRepoInfo";
import React from "react";
import SidebarMobileView from "@components/molecules/sidebarMobileView";

interface IProps {
  children: React.ReactNode;
}

const RepositoryTemplate = ({ children }: IProps) => {
  return (
    <>
      <CheckPanelUrlData />
      <CheckRepoInfo>
        <div className="w-full">{children}</div>
        <RepoLog />
      </CheckRepoInfo>
      <SidebarMobileView />
    </>
  );
};

export default RepositoryTemplate;
