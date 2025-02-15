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
      className="p-4 !h-auto overflow-x-hidden overflow-y-auto"
      placeholder="action-drawer"
    >
      <ul
        className={`w-full
               ml-4 font-iranYekan text-primary overflow-hidden p-[2px]`}
      >
        {menuList.map((menuItem) => {
          return menuItem?.subMenu ? (
            <div key={`drawer-sub-menu-${menuItem.text}`}>
              <Button
                className="w-full flex items-center justify-between bg-transparent px-0"
                onClick={() => {
                  return toggleOpen(menuItem.text);
                }}
              >
                <Typography className="select_option__text text-primary font-normal ">
                  {menuItem.text}
                </Typography>
                <ChevronLeftIcon
                  className={`h-2 w-2 transition-transform stroke-icon-active ${
                    openStates[menuItem.text] ? "" : "rotate-90"
                  }`}
                />
              </Button>
              <Collapse open={openStates[menuItem.text]}>
                <ul className="w-full ml-4 font-iranYekan text-primary overflow-hidden p-[2px]">
                  {menuItem.subMenu.map((subItem) => {
                    return (
                      <li
                        key={`drawer-sub-menu-${subItem.text}`}
                        className="cursor-pointer py-2 flex"
                        onClick={subItem?.onClick}
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
              className="cursor-pointer py-2 flex"
              onClick={menuItem?.onClick}
            >
              <div className="flex items-center gap-1">
                {menuItem?.icon}
                <Typography className="select_option__text font-normal">
                  {menuItem.text}
                </Typography>
              </div>
            </li>
          );
        })}
      </ul>
    </Drawer>
  );
};

export default DrawerComponent;
