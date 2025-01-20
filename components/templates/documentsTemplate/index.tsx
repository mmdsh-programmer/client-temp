"use client";

import BaseTemplate from "../baseTemplate";
import React from "react";

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
