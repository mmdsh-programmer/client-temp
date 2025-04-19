import React from "react";
import { Typography } from "@material-tailwind/react";

interface IProps {
  title: string;
  value?: string;
  className?: string;
}

const CardItemRow = ({ value, title, className }: IProps) => {
  return (
    <div className="flex items-center h-6 gap-2">
      <Typography className="label text-placeholder">{title}</Typography>
      <div className="flex-grow flex-shrink-0 pt-1">
        <div className="border-b-[2px] border-dashed border-normal" />
      </div>
      <Typography className={`${className || ""} label text-primary_normal`}>
        {value || "--"}
      </Typography>
    </div>
  );
};

export default CardItemRow;
