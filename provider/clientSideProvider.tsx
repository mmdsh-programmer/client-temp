"use client";

import React from "react";
import useClient from "@hooks/custom/useClient";

const ClientSideProvider = ({ children }: { children: React.ReactNode}) => {
  // it will be used to insure component is in client side
  const isClient = useClient();

  if(isClient){
    return children;
  }

  return null;
};

export default ClientSideProvider;
