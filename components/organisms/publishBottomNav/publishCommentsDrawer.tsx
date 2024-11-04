import React, { useState } from "react";
import { Button, Drawer, IconButton } from "@material-tailwind/react";
import { ChatIcon, XIcon } from "@components/atoms/icons";
import Comments from "../editorDrawer/comments";
import { IVersion } from "@interface/version.interface";

interface IProps {
  version: IVersion;
}

const PublishCommentsDrawer = ({ version }: IProps) => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    return setOpen(true);
  };
  const closeDrawer = () => {
    return setOpen(false);
  };

  return (
    <>
      <Button
        className="border-gray-400 w-fit min-w-fit p-2.5"
        onClick={openDrawer}
        variant="outlined"
      >
        <span className="hidden sm:block">نظرات</span>
        <ChatIcon className="w-4 h-4 fill-gray-700 block sm:hidden" />
      </Button>
      <Drawer
        open={open}
        onClose={closeDrawer}
        className="p-4"
        placement="left"
        size={320}
        dismiss={{
          enabled: false,
        }}
      >
        <IconButton
          onClick={closeDrawer}
          variant="outlined"
          size="sm"
        >
          <XIcon className="w-4 h-4" />
        </IconButton>
        <div className="h-[calc(100%-50px)] mt-4">
          {open ? <Comments version={version} /> : null}
        </div>
      </Drawer>
    </>
  );
};

export default PublishCommentsDrawer;
