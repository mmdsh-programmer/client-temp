import React from "react";
import { Tooltip } from "@material-tailwind/react";

interface IProps {
  content: string;
  children: React.ReactNode;
}

const TooltipComponent = ({ content, children }: IProps) => {
  return (
    <Tooltip
      content={content}
      placement="bottom"
      className="rounded shadow-lg bg-gray-900 text-gray-100 font-iranYekan text-xs p-2"
    >
      <div className="cursor-pointer">{children}</div>
    </Tooltip>
  );
};

export default TooltipComponent;
