import React from "react";
import MenuComponent from "@components/molecules/menu";
import { Button } from "@material-tailwind/react";
import { MoreDotIcon } from "@components/atoms/icons";

interface IProps {
  menuList: {
    text: string;
    icon?: React.JSX.Element;
    onClick: () => void;
  }[];
  icon?: React.ReactNode;
  className?: string;
}

const DesktopMenu = ({ menuList, icon, className }: IProps) => {
  return (
    <MenuComponent
      variant="small"
      menuList={menuList}
      className="!min-w-[170px] !w-[170px]"
    >
      <Button
        className={`${className || ""} rounded-lg bg-transparent p-1 shadow-none flex justify-center hover:shadow-none items-center`}
        placeholder="menu-button"
      >
        {icon ? icon : <MoreDotIcon className="w-4 h-4 fill-icon-active" />}
      </Button>
    </MenuComponent>
  );
};

export default DesktopMenu;
