import React from "react";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { placement } from "@material-tailwind/react/types/components/menu";
import NestedMenu from "./nestedMenu";

interface IProps {
  variant: "small" | "medium" | "large";
  className?: string;
  children: React.ReactNode;
  menuList: {
    text: string;
    icon?: React.ReactNode;
    onClick?:
      | (React.MouseEventHandler<HTMLLIElement> &
          React.MouseEventHandler<HTMLButtonElement>)
      | undefined;
    subMenu?: { text: string; icon?: React.JSX.Element; onClick: () => void }[];
  }[];
  menuClick?: () => void;
}

const MenuComponent = ({
  variant,
  children,
  menuList,
  className,
  menuClick,
}: IProps) => {
  return (
    <Menu placement="bottom">
      <MenuHandler>{children}</MenuHandler>
      <MenuList
        className={` ${className} !z-[99999] ml-4 font-iranYekan text-primary overflow-hidden p-[2px]`}
        placeholder="menu-list"
      >
        {menuList.map((menuItem, index) => {
          return menuItem.subMenu ? (
            <NestedMenu
              variant="small"
              menuName={menuItem.text}
              subMenuList={menuItem.subMenu}
              key={`sub-menu-${index}`}
            />
          ) : (
            <MenuItem
              key={`menu-${index}`}
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

export default MenuComponent;
