import React from "react";
import { Tooltip } from "@material-tailwind/react";

interface IProps {
  content: string;
  children: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  className?: string;
}

const TooltipComponent = ({ content, children, placement = "top", className }: IProps) => {
  return (
    <Tooltip
      content={content}
      placement={placement}
      className={`bg-gray-900 px-4 py-2 text-white z-[9999] font-iranYekan ${className || ""}`}
    >
      {children}
    </Tooltip>
  );
};

export default TooltipComponent; 