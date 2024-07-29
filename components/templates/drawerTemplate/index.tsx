import React from "react";
import { Drawer, Typography } from "@material-tailwind/react";

interface IProps {
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
              <div className="flex items-center">
                {menuItem.icon}
                <Typography
                  placeholder="menu-item-text"
                  className={`font-iranYekan font-medium text-base mr-2`}
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
