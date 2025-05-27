/* eslint-disable react/no-array-index-key */

import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";

import NestedMenu from "./nestedMenu";
import React from "react";

interface IProps {
  variant: "small" | "medium" | "large";
  className?: string;
  children: React.ReactNode;
  menuList: {
    text: string;
    icon?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?:
      | (React.MouseEventHandler<HTMLLIElement> &
          React.MouseEventHandler<HTMLButtonElement>)
      | undefined;
    subMenu?: {
      text: string;
      icon?: React.JSX.Element;
      onClick: () => void;
      disabled?: boolean;
      className?: string;
    }[];
  }[];
}

const MenuComponent = ({ variant, children, menuList, className }: IProps) => {
  return (
    <Menu placement="bottom">
      <MenuHandler>{children}</MenuHandler>
      <MenuList
        className={` ${className} !z-[99999] ml-4 font-iranYekan text-primary_normal overflow-hidden p-[2px]`}
        placeholder="menu-list"
      >
        {menuList.map((menuItem, index) => {
          return menuItem.subMenu ? (
            <NestedMenu
              variant="small"
              menuName={menuItem.text}
              subMenuList={menuItem.subMenu}
              key={`sub-menu-${index}`}
              icon={menuItem.icon}
              className={menuItem.className}
            />
          ) : (
            <MenuItem
              key={`menu-${index}`}
              placeholder="menu-item"
              className={`p-2 ${menuItem.className}`}
              onClick={menuItem.onClick}
              disabled={menuItem.disabled}
            >
              <div className="flex items-center gap-2">
                {menuItem.icon}
                <Typography
                  placeholder="menu-item-text"
                  className={`font-iranYekan 
                     ${variant === "small" ? " font-light text-[12px] " : "font-medium text-base mb-1"}`}
                >
                  {menuItem.text}
                </Typography>
              </div>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default MenuComponent;
