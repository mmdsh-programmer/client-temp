import React from "react";
import { Button } from "@material-tailwind/react";
import { MoreDotIcon } from "@components/atoms/icons";
import MenuComponent from "@components/molecules/menu";

export interface MenuItem {
  text: string;
  icon?: React.JSX.Element;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  subMenu?: MenuItem[];
}

export interface IProps {
  menuList: MenuItem[];
  onMobileClick: () => void;
  icon?: React.ReactNode;
  className?: string;
}

const MenuTemplate = ({ menuList, onMobileClick, icon, className }: IProps) => {
  const triggerIcon = icon || <MoreDotIcon className="h-4 w-4" />;

  return (
    <>
      <div className="desktop-menu hidden justify-end xs:flex">
        <MenuComponent variant="small" menuList={menuList} className="!w-auto !min-w-max">
          <Button
            className={`${className || ""} flex items-center justify-center rounded-lg bg-transparent p-1 shadow-none hover:shadow-none`}
            placeholder="menu-button"
          >
            {triggerIcon}
          </Button>
        </MenuComponent>
      </div>
      <div className="mobile-menu flex xs:hidden">
        <Button
          className={`${className || ""} flex items-center justify-center rounded-lg bg-transparent p-0 shadow-none hover:shadow-none`}
          placeholder="menu-button"
          onClick={onMobileClick}
        >
          {triggerIcon}
        </Button>
      </div>
    </>
  );
};

export default MenuTemplate;
