"use client";

import React from "react";
import { RenderClientSideContent } from "clasor-content-preview";
import "clasor-content-preview/src/styles/contentPreview.css";

const RenderClientContent = () => {
  return (
    <RenderClientSideContent
      podSpaceServer={`${process.env.NEXT_PUBLIC_PODSPACE_API}/`}
    />
  );
};

export default RenderClientContent;
