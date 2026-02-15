"use client";

import React from "react";
import Feeds from "@components/organisms/feeds";
import InfoDialog from "@components/templates/dialog/infoDialog";

interface IProps {
  children: React.ReactNode;
}

const FeedsDialog = ({ children }: IProps) => {
  return (
    <InfoDialog
      trigger={children}
      dialogHeader="خبرنامه ها"
      contentClassName="!pt-0 !px-0 min-h-[400px]"
      className="xs:max-w-[unset]"
      backToMain
    >
      <Feeds />
    </InfoDialog>
  );
};

export default FeedsDialog;
