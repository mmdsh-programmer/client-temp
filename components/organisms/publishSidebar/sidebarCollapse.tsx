import React, { useState } from "react";
import { Button, Collapse } from "@material-tailwind/react";
import { ChevronLeftIcon, FolderIcon } from "@components/atoms/icons";

interface IProps {
  title: string;
  children: JSX.Element;
  className?: string;
  onClick?: () => void;
}

const SidebarCollapse = ({ title, children, className, onClick }: IProps) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    onClick?.();
    return setOpen((current) => {
      return !current;
    });
  };

  return (
    <>
      <Button
        onClick={toggleOpen}
        className={`collapse-button py-2 justify-start bg-transparent flex items-center w-full hover:bg-purple-light rounded-[5px] px-1 ${className} ${open ? "active-collapse" : ""}`}
      >
        <ChevronLeftIcon
          className={`stroke-gray-500 w-2 h-2 flex-none self-start mt-[7px] ${
            open ? "-rotate-90" : ""
          }`}
        />
        <FolderIcon className="w-5 h-5 fill-none stroke-blue-gray-600 mr-2 flex-none self-start" />
        <span className="text-sm text-gray-700 font-bold mr-1 text-right">
          {title}
        </span>
      </Button>
      <Collapse open={open}>
        <div className="pr-4 collapse-content flex flex-col">
          {open ? children : null}
        </div>
      </Collapse>
    </>
  );
};

export default SidebarCollapse;
