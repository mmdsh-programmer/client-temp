"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@components/ui/dropdown-menu";
import NestedMenu from "./nestedMenu";
import { cn } from "@utils/cn";

interface IProps {
  variant: "small" | "medium" | "large";
  className?: string;
  children: React.ReactNode;
  menuList: {
    text: string;
    icon?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
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
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger className="cursor-pointer" asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          className,
          "!z-[99999] ml-4 overflow-hidden p-[2px] font-iranYekan text-primary_normal",
        )}
      >
        {menuList.map((menuItem, index) =>
          menuItem.subMenu ? (
            <NestedMenu
              key={`sub-menu-${index}`}
              variant={variant}
              menuName={menuItem.text}
              icon={menuItem.icon}
              subMenuList={menuItem.subMenu}
              className={menuItem.className}
            />
          ) : (
            <DropdownMenuItem
              key={`menu-${index}`}
              className={cn("p-2", menuItem.className)}
              onSelect={() => menuItem.onClick?.()}
            >
              <div className="flex items-center gap-2">
                {menuItem.icon}
                <span
                  className={cn(
                    "font-iranYekan",
                    variant === "small" ? "text-[12px] font-light" : "mb-1 text-base font-medium",
                  )}
                >
                  {menuItem.text}
                </span>
              </div>
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuComponent;
