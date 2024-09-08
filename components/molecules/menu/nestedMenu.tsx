"use client";

import React, { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { placement } from "@material-tailwind/react/types/components/menu";
import { ChevronLeftIcon } from "@components/atoms/icons";

interface IProps {
  variant: "small" | "medium" | "large";
  className?: string;
  menuName: string;
  subMenuList: {
    text: string
    icon?: React.ReactNode;
    onClick?:
      | (React.MouseEventHandler<HTMLLIElement> &
          React.MouseEventHandler<HTMLButtonElement>)
      ;
  }[];
  menuClick?: () => void;
}

const NestedMenu = ({
  variant,
  menuName,
  subMenuList,
  className,
  menuClick,
}: IProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <Menu
      placement="right-start"
      open={openMenu}
      handler={setOpenMenu}
      allowHover
      offset={15}
    >
      <MenuHandler className="font-light text-[12px] px-4 py-2 flex items-center justify-between">
        <MenuItem className="font-light text-[12px]">
          {menuName}
          <ChevronLeftIcon
            className={`h-2 w-2 transition-transform stroke-icon-active ${
              openMenu ? "rotate-90" : ""
            }`}
          />
        </MenuItem>
      </MenuHandler>
      <MenuList
        className={`${
          variant === "small"
            ? "w-[180px]"
            : variant === "medium"
              ? "w-[220px]"
              : "w-full"
        } ${className} -ml-3 !z-[99999] font-iranYekan text-primary overflow-hidden p-[2px]`}
        placeholder="menu-list"
      >
        {subMenuList.map((menuItem, index) => {
          return (
            <MenuItem
              key={`sub-menu-${index}`}
              placeholder="menu-item"
              className={`${variant === "small" ? "p-2" : "p-3"}`}
              onClick={menuItem.onClick}
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
