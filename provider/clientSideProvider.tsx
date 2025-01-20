"use client";

import React from "react";
import { Spinner } from "@material-tailwind/react";
import useClient from "@hooks/custom/useClient";

const ClientSideProvider = ({ children }: { children: React.ReactNode }) => {
  // it will be used to insure component is in client side
  const isClient = useClient();
  return isClient ? children : <Spinner />;
};

export default ClientSideProvider;
