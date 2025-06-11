"use client";

import { Button, Collapse, Drawer, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { ChevronLeftIcon } from "@components/atoms/icons";

export interface IProps {
  openDrawer: boolean | null;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean | null>>;
  menuList: {
    text: string;
    icon?: React.JSX.Element;
    disabled?: boolean;
    onClick: () => void;
    subMenu?: {
      text: string;
      icon?: React.JSX.Element;
      onClick: () => void;
      disabled?: boolean;
    }[];
  }[];
}

const DrawerComponent = ({ menuList, openDrawer, setOpenDrawer }: IProps) => {
  const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>({});

  const toggleOpen = (menuText: string) => {
    setOpenStates((prev) => {
      return {
        ...prev,
        [menuText]: !prev[menuText],
      };
    });
  };

  return (
    <Drawer
      placement="bottom"
      open={!!openDrawer}
      onClose={() => {
        setOpenDrawer(null);
      }}
      className="!h-auto overflow-y-auto overflow-x-hidden p-4"
      placeholder="action-drawer"
    >
      <ul className="ml-4 w-full overflow-hidden p-[2px] font-iranYekan text-primary_normal">
        {menuList.map((menuItem) => {
          return menuItem?.subMenu ? (
            <div key={`drawer-sub-menu-${menuItem.text}`}>
              <Button
                className="flex w-full items-center justify-between bg-transparent px-0"
                onClick={() => {
                  return toggleOpen(menuItem.text);
                }}
              >
                <Typography className="select_option__text font-normal text-primary_normal">
                  {menuItem.text}
                </Typography>
                <ChevronLeftIcon
                  className={`h-2 w-2 stroke-icon-active transition-transform ${
                    openStates[menuItem.text] ? "" : "rotate-90"
                  }`}
                />
              </Button>
              <Collapse open={openStates[menuItem.text]}>
                <ul className="ml-4 w-full overflow-hidden p-[2px] font-iranYekan text-primary_normal">
                  {menuItem.subMenu.map((subItem) => {
                    return (
                      <li
                        key={`drawer-sub-menu-${subItem.text}`}
                        className={`flex cursor-pointer py-2 ${subItem.disabled ? "cursor-not-allowed opacity-50" : ""}`}
                        onClick={subItem.disabled ? undefined : subItem?.onClick}
                      >
                        <div className="flex items-center gap-1">
                          {subItem?.icon}
                          <Typography className="select_option__text font-normal">
                            {subItem.text}
                          </Typography>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Collapse>
            </div>
          ) : (
            <li
              key={`drawer-menu-${menuItem.text}`}
              className={`flex cursor-pointer py-2 ${menuItem.disabled ? "cursor-not-allowed opacity-50" : ""}`}
              onClick={menuItem.disabled ? undefined : menuItem?.onClick}
            >
              <div className="flex items-center gap-1">
                {menuItem?.icon}
                <Typography className="select_option__text font-normal">{menuItem.text}</Typography>
              </div>
            </li>
          );
        })}
      </ul>
    </Drawer>
  );
};

export default DrawerComponent;
