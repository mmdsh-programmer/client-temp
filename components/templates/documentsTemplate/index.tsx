"use client";

import Header from "@components/organisms/header";
import React from "react";
import Sidebar from "@components/organisms/sidebar";
import Start from "../start";
import BaseTemplate from "../baseTemplate";

interface IProps {
  children: React.ReactNode;
}

const DocumentsTemplate = ({ children }: IProps) => {
  return (
    <BaseTemplate>
    {children}
    </BaseTemplate>
         
  );
};

export default DocumentsTemplate;
