"use client";

import React from "react";
import StoreResetter from "@components/organisms/storeResetter";

interface IProps {
  children: React.ReactNode;
}

const Template = ({ children }: IProps) => {
  return (
    <>
      <StoreResetter />
      {children}
    </>
  );
};

export default Template;
