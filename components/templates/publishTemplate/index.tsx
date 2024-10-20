"use client";

import React, { ReactNode } from "react";

import PublishFooter from "@components/organisms/footer/publishFooter";
import PublishHeader from "@components/organisms/header/publishHeader";

declare interface IProps {
  children: ReactNode;
}

const PublishTemplate = ({ children }: IProps) => {
  return (
    <>
      <PublishHeader />
        <main className="px-0 xs:px-8 h-[calc(100vh-156px)] overflow-y-auto">{children}</main>
      <PublishFooter />
    </>
  );
};

export default PublishTemplate;
