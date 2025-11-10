"use client";

import React from "react";
import { XIcon } from "@components/atoms/icons";
import { Drawer, IconButton } from "@material-tailwind/react";
import { usePublishStore } from "@store/publish";
import { IVersion } from "@interface/version.interface";
import useGetUser from "@hooks/auth/useGetUser";
import PublishForceLogin from "../publishFeedback/publishForceLogin";
import PublishFileList from "./publishFileList";

interface IProps {
  version: IVersion;
}

const PublishFilesDrawer = ({ version }: IProps) => {
  const { data: userInfo } = useGetUser();
  const { openPublishFilesDrawer, setOpenPublishFilesDrawer } = usePublishStore();

  const closeDrawer = () => {
    setOpenPublishFilesDrawer(false);
  };

  if (!userInfo) {
    return <PublishForceLogin />;
  }

  return (
    <Drawer
      {...({} as React.ComponentProps<typeof Drawer>)}
      open={openPublishFilesDrawer}
      onClose={closeDrawer}
      className="p-4"
      placement="left"
    >
      <IconButton
        {...({} as React.ComponentProps<typeof IconButton>)}
        onClick={closeDrawer}
        variant="outlined"
        className="!absolute right-3 top-4"
        size="sm"
      >
        <XIcon className="h-4 w-4" />
      </IconButton>
      <div className="mt-14 flex w-full flex-col justify-center gap-4">
        <PublishFileList version={version} />
      </div>
    </Drawer>
  );
};

export default PublishFilesDrawer;
