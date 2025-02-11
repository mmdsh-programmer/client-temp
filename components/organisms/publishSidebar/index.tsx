"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

const PublishSidebarWrapper = ({ children }: IProps) => {
  const pathname = usePathname();
  if(pathname === "/publish"){
    return null;
  }
  return children;
};

export default PublishSidebarWrapper;
