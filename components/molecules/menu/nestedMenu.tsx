"use client";

import React from "react";
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@components/ui/dropdown-menu";
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
    <DropdownMenuSub>
      <DropdownMenuSubTrigger
        className={cn(
          "flex cursor-default items-center justify-between py-2 pl-4 pr-2 text-[12px] font-light",
          className,
        )}
        dir="rtl"
      >
        <div dir="rtl" className="flex items-center gap-2">
          {icon}
          <span>{menuName}</span>
        </div>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="!z-[99999] -ml-3 !w-auto !min-w-max overflow-hidden p-[2px] font-iranYekan text-primary_normal">
          {subMenuList.map((menuItem, index) => (
            <DropdownMenuItem
              key={`sub-menu-${index}`}
              className={cn("p-2", menuItem.className)}
              onSelect={() => menuItem.onClick?.()}
            >
              <div className="flex items-center gap-2">
                {menuItem.icon}
                <span
                  className={cn(
                    "font-iranYekan",
                    variant === "small"
                      ? "mr-2 text-[12px] font-light"
                      : "mb-1 text-base font-medium",
                  )}
                >
                  {menuItem.text}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

export default NestedMenu;
