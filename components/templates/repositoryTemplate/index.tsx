"use client";

import CheckPanelUrlData from "../checkPanelUrlData";
import CheckRepoInfo from "../checkRepoInfo";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

const RepositoryTemplate = ({ children }: IProps) => {
  return (
    <>
      <CheckPanelUrlData />
      <CheckRepoInfo>
        <div className="">{children}</div>
      </CheckRepoInfo>
    </>
  );
};

export default RepositoryTemplate;
