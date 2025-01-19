"use client";

import React from "react";
import CheckRepoInfo from "../checkRepoInfo";
import CheckPanelUrlData from "../checkPanelUrlData";

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
