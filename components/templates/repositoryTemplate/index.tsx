"use client";

import React from "react";
import CheckRepoInfo from "../checkRepoInfo";
import CheckPanelUrlData from "../checkPanelUrlData";
import CheckRepoInfo from "../checkRepoInfo";
import Header from "@components/organisms/header";
import { ICustomPostData } from "@interface/app.interface";
import React from "react";
import Sidebar from "@components/organisms/sidebar";
import SidebarHeader from "@components/molecules/sidebarHeader";
import Start from "../start";

interface IProps {
  children: React.ReactNode;
  domainInfo: ICustomPostData;
}

const RepositoryTemplate = ({ children, domainInfo }: IProps) => {
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
