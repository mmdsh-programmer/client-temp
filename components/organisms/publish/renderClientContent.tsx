"use client";

import React, { useEffect, useState } from "react";
import { RenderClientSideContent } from "clasor-content-preview";
import { IVersion } from "@interface/version.interface";
import "clasor-content-preview/src/styles/contentPreview.css";

interface IProps {
  versionData: IVersion;
}
const RenderClientContent = ({ versionData }: IProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 10);
  }, [versionData]);

  if (loading) {
    return null;
  }

  return (
    <RenderClientSideContent
      podSpaceServer={`${process.env.NEXT_PUBLIC_PODSPACE_API}/`}
    />
  );
};

export default RenderClientContent;
