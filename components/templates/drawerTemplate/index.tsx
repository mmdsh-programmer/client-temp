import React from "react";
import { Drawer, Typography } from "@material-tailwind/react";

export interface IProps {
  openDrawer: boolean | null;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean | null>>;
  menuList: {
    text: string;
    icon?: React.JSX.Element;
    onClick: () => void;
  }[];
}

const DrawerComponent = ({ menuList, openDrawer, setOpenDrawer }: IProps) => {
  return (
    <Drawer
      placement="bottom"
      open={!!openDrawer}
      onClose={() => {
        setOpenDrawer(null);
      }}
      className="p-4 !h-auto"
      placeholder="action-drawer"
    >
      <ul
        className={`w-full
               ml-4 font-iranYekan text-primary overflow-hidden p-[2px]`}
      >
        {menuList.map((menuItem, index) => {
          return (
            <li
              key={index}
              className={`cursor-pointer py-2 flex`}
              onClick={menuItem?.onClick}
            >
              <div className="flex items-center gap-1">
                {menuItem.icon}
                <Typography
                  className={`select_option__text font-normal`}
                >
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
