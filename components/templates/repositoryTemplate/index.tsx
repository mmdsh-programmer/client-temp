"use client";

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
    <Start>
      <div className="flex max-w-screen-2xl m-auto">
        <Sidebar>
          <SidebarHeader domainInfo={domainInfo} />
        </Sidebar>
        <main className="bg-secondary flex-grow h-screen overflow-hidden">
          <Header />
          <CheckPanelUrlData />
          <CheckRepoInfo>
            <div className="overflow-auto h-[calc(100vh-195px)] xs:h-[calc(100vh-80px)] flex flex-col px-0 py-0 xs:px-8 xs:pt-6 xs:pb-8">
              {children}
            </div>
          </CheckRepoInfo>
        </main>
      </div>
    </Start>
  );
};

export default RepositoryTemplate;
