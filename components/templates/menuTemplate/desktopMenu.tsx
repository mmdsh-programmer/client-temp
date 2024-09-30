import { Button } from "@material-tailwind/react";
import MenuComponent from "@components/molecules/menu";
import { MoreDotIcon } from "@components/atoms/icons";
import React from "react";

interface IProps {
  menuList: {
    text: string;
    icon?: React.JSX.Element;
    onClick: () => void;
  }[];
  icon?: React.ReactNode;
  className?: string;
}

const DesktopMenu = ({
 menuList, icon, className 
}: IProps) => {
  return (
    <MenuComponent
      variant="small"
      menuList={menuList}
      className="!min-w-max !w-auto"
    >
      <Button
        className={`${className || ""} rounded-lg bg-transparent p-1 shadow-none flex justify-center hover:shadow-none items-center`}
        placeholder="menu-button"
      >
        {icon || <MoreDotIcon className="w-4 h-4 " />}
      </Button>
    </MenuComponent>
  );
};

export default DesktopMenu;
