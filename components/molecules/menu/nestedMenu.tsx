"use client";

import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";

import { ChevronLeftIcon } from "@components/atoms/icons";

interface IProps {
  variant: "small" | "medium" | "large";
  menuName: string;
  icon?: React.ReactNode;
  subMenuList: {
    text: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLLIElement> &
      React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
  }[];
  className?: string;
}

const NestedMenu = ({ variant, menuName, subMenuList, icon, className }: IProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <Menu
      placement="right-start"
      open={openMenu}
      handler={setOpenMenu}
      allowHover
      offset={15}
    >
      <MenuHandler className="font-light text-[12px] pl-4 pr-2 py-2 flex items-center justify-between">
        <MenuItem className="font-light text-[12px]">
          <div className="flex gap-2">
            {icon}
            {menuName}
          </div>
          <ChevronLeftIcon
            className={`h-2 w-2 transition-transform stroke-icon-active ${
              openMenu ? "rotate-90" : ""
            }`}
          />
        </MenuItem>
      </MenuHandler>
      <MenuList
        className={`${className}!min-w-max !w-auto -ml-3 !z-[99999] font-iranYekan text-primary_normal overflow-hidden p-[2px]`}
        placeholder="menu-list"
      >
        {subMenuList.map((menuItem, index) => {
          return (
            <MenuItem
              // eslint-disable-next-line react/no-array-index-key
              key={`sub-menu-${index}`}
              placeholder="menu-item"
              className={`p-2 ${menuItem.className || ""}`}
              onClick={menuItem.onClick}
              disabled={menuItem.disabled}
            >
              <div className="flex">
                {menuItem.icon}
                <Typography
                  placeholder="menu-item-text"
                  className={`font-iranYekan ${variant === "small" ? " font-light text-[12px] mr-2" : "font-medium text-base mb-1"}`}
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

export default NestedMenu;
