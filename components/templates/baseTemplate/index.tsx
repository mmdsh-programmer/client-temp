"use client";

import React from "react";
import Header from "@components/organisms/header";
import { ICustomPostData } from "@interface/app.interface";
import Sidebar from "@components/organisms/sidebar";
import SidebarHeader from "@components/molecules/sidebarHeader";
import SidebarMobileView from "@components/molecules/sidebarMobileView";
import Start from "@components/templates/start";
import Tour from "@components/tour";
import { usePathname } from "next/navigation";

interface IProps {
  children: React.ReactNode;
  domainInfo: ICustomPostData;
}

const BaseTemplate = ({ children, domainInfo }: IProps) => {

  const pathname = usePathname();

  if (pathname?.includes("/admin/edit")) {
    return children;
  }
  
  return (
    <>
      <Tour />
      <Start>
        <div className="flex m-auto">
          <Sidebar>
            <SidebarHeader domainInfo={domainInfo} />
          </Sidebar>
          <main className="bg-primary flex-grow h-screen overflow-hidden flex flex-col">
            <Header />
            <div className="overflow-auto max-h-[calc(100vh-180px)] h-[calc(100vh-180px)] xs:h-[calc(100vh-68px)] xs:max-h-[calc(100vh-68px)] flex flex-col px-0 py-0 xs:px-8 xs:pt-6 xs:pb-8">
              {children}
            </div>
            <SidebarMobileView />
          </main>
        </div>
      </Start>
    </>
  );
};

export default BaseTemplate;
