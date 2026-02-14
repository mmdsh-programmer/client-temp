"use client";

import React from "react";
import DesktopAttributes from "@components/molecules/landingDesktopAttribute";
import LandingMobileAttributes from "@components/molecules/landingMobileAttributes";
import useWindowSize from "@hooks/useWindowSize";

const LandingAttributeWrapper = () => {
  const pageSize = useWindowSize();
  return pageSize.width >= 768 ? <DesktopAttributes /> : <LandingMobileAttributes />;
};

export default LandingAttributeWrapper;
