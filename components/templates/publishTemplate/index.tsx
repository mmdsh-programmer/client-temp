"use client";

import React, { ReactNode } from "react";
import PublishHeader from "@components/organisms/header/publishHeader";

declare interface IProps {
  children: ReactNode;
}

const PublishTemplate = ({ children }: IProps) => {
  return (
    <>
      <PublishHeader />
      <main className="px-0 xs:px-8 h-[calc(100vh-81px)] overflow-y-auto">{children}</main>
    </>
  );
};

export default PublishTemplate;
