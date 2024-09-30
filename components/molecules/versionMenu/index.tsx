import ConfirmVersionMenu from "./confirmVersionMenu";
import DraftVersionMenu from "./draftVersionMenu";
import { IVersion } from "@interface/version.interface";
import PublicVersionMenu from "./publicVersionMenu";
import React from "react";

interface IProps {
  version?: IVersion;
  lastVersion?: IVersion;
  showDrawer?: boolean;
}

const VersionMenu = ({
 lastVersion, version, showDrawer 
}: IProps) => {
  if (
    version?.status === "editing" ||
    (version?.status === "pending" && version?.state === "draft")
  ) {
    return <DraftVersionMenu version={version} showDrawer={showDrawer} />;
  }
  if (
    version?.status === "private" ||
    (version?.status === "pending" && version?.state === "version")
  ) {
    return <ConfirmVersionMenu version={version} lastVersion={lastVersion} />;
  }
  if (
    version?.status === "accepted" ||
    version?.status === "rejected" ||
    version?.status === "public"
  ) {
    return <PublicVersionMenu version={version} lastVersion={lastVersion} />;
  }
  return null;
};

export default VersionMenu;
