"use client";

import Attributes from "./attributes";
import DesktopAttributes from "./desktopAttributes";
import React from "react";
import useWindowSize from "@hooks/useWindowSize";

const AttributeWrapper = () => {
  const pageSize = useWindowSize();
  return pageSize.width >= 768 ? <DesktopAttributes /> : <Attributes />;
};

export default AttributeWrapper;
