import React from "react";
import { MoreDotIcon } from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";

interface IProps {
  setOpenDrawer: () => void;
  icon?: React.ReactNode;
  className?: string;
}

const MobileMenu = ({ setOpenDrawer, icon, className }: IProps) => {
  return (
    <div className="flex gap-x-2 justify-end">
      <Button
        className={`${className || ""} rounded-lg bg-transparent p-0 shadow-none flex justify-center hover:shadow-none items-center`}
        placeholder="menu-button"
        onClick={setOpenDrawer}
      >
        {icon || <MoreDotIcon className="w-4 h-4" />}
      </Button>
    </div>
  );
};

export default MobileMenu;
