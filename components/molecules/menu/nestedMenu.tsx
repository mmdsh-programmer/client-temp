"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@components/ui/dropdown-menu";
import { ChevronLeftIcon } from "@components/atoms/icons";
import { cn } from "@utils/cn";

interface IProps {
  variant: "small" | "medium" | "large";
  menuName: string;
  icon?: React.ReactNode;
  subMenuList: {
    text: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
  }[];
  className?: string;
}

const NestedMenu = ({ variant, menuName, subMenuList, icon, className }: IProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={cn("font-light text-[12px] pl-4 pr-2 py-2 flex items-center justify-between cursor-default", className)}>
          <div className="flex gap-2 items-center">{icon}<span>{menuName}</span></div>
          <ChevronLeftIcon className="h-2 w-2 transition-transform stroke-icon-active" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={8} className="!min-w-max !w-auto -ml-3 !z-[99999] font-iranYekan text-primary_normal overflow-hidden p-[2px]">
        {subMenuList.map((menuItem, index) => (
          <DropdownMenuItem key={`sub-menu-${index}`} className={cn("p-2", menuItem.className)} onSelect={() => menuItem.onClick?.()}>
            <div className="flex items-center gap-2">
              {menuItem.icon}
              <span className={cn("font-iranYekan", variant === "small" ? "font-light text-[12px] mr-2" : "font-medium text-base mb-1")}>
                {menuItem.text}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NestedMenu;
