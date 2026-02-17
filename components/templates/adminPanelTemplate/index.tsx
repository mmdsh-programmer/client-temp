"use client";

import React from "react";
import Header from "@components/organisms/header";
import Start from "@components/templates/start";
import SidebarMobileView from "@components/molecules/sidebarMobileView";
import NotFoundTemplate from "@components/templates/not-found";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  children: React.ReactNode;
}

const AdminPanelTemplate = ({ children }: IProps) => {
  const { data: userInfo } = useGetUser();

  if (!userInfo?.isClasorAdmin) {
    return <NotFoundTemplate />;
  }
  
  return (
    <Start>
      <div className="m-auto flex max-w-screen-2xl">
        <main className="h-screen flex-grow overflow-hidden bg-secondary">
          <Header />
          <div className="flex h-[calc(100vh-110px)] flex-col overflow-auto px-0 py-0 xs:h-[calc(100vh-80px)] xs:px-8 xs:pb-8 xs:pt-6">
            {children}
          </div>
        </main>
        <SidebarMobileView />
      </div>
    </Start>
  );
};

export default AdminPanelTemplate;
