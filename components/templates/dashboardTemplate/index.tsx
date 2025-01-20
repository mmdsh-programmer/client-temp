"use client";

import BaseTemplate from "../baseTemplate";
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

const DashboardTemplate = ({ children }: IProps) => {
  return <BaseTemplate>{children}</BaseTemplate>;
};

export default DashboardTemplate;
