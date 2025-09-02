"use client";

import React, { useState } from "react";
import { Button, Collapse, Drawer, Typography } from "@material-tailwind/react";
import { ChevronLeftIcon } from "@components/atoms/icons";
import { MenuItem } from "../menuTemplate";

export interface IProps {
  openDrawer: boolean | null;
  setOpenDrawer: (isOpen: boolean) => void;
  menuList: MenuItem[];
}

const MenuItemRenderer = ({ item }: { item: MenuItem }) => {
  return (
    <li
      className={`flex cursor-pointer items-center gap-1 py-2 ${item.disabled ? "cursor-not-allowed opacity-50" : ""}`}
      onClick={item.disabled ? undefined : item.onClick}
      dir="rtl"
    >
      {item.icon}
      <Typography className="select_option__text font-normal">{item.text}</Typography>
    </li>
  );
};

const SubMenuRenderer = ({ item }: { item: MenuItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    return setIsOpen((prev) => {
      return !prev;
    });
  };

  return (
    <div>
      <Button
        className="flex w-full items-center justify-between bg-transparent px-0 text-primary_normal"
        onClick={toggleOpen}
        placeholder="submenu-button"
      >
        <Typography className="select_option__text font-normal">{item.text}</Typography>
        <ChevronLeftIcon
          className={`h-2 w-2 stroke-icon-active ${isOpen ? "rotate-90 transition-transform" : "-rotate-180 transform-none"}`}
        />
      </Button>
      <Collapse open={isOpen}>
        <ul className="ml-4 w-full overflow-hidden p-[2px] font-iranYekan">
          {item.subMenu?.map((subItem) => {
            return <MenuItemRenderer key={`sub-item-${subItem.text}`} item={subItem} />;
          })}
        </ul>
      </Collapse>
    </div>
  );
};

const DrawerTemplate = ({ menuList, openDrawer, setOpenDrawer }: IProps) => {
  return (
    <Drawer
      placement="bottom"
      open={!!openDrawer}
      onClose={() => {
        return setOpenDrawer(false);
      }}
      className="!h-auto max-h-[70vh] overflow-y-auto overflow-x-hidden p-4"
      placeholder="action-drawer"
    >
      <ul className="ml-4 w-full overflow-hidden p-[2px] font-iranYekan text-primary_normal">
        {menuList.map((menuItem) => {
          return menuItem.subMenu ? (
            <SubMenuRenderer key={`menu-item-${menuItem.text}`} item={menuItem} />
          ) : (
            <MenuItemRenderer key={`menu-item-${menuItem.text}`} item={menuItem} />
          );
        })}
      </ul>
    </Drawer>
  );
};

export default DrawerTemplate;
