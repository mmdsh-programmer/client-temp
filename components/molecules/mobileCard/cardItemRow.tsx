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
      <Typography
        placeholder=""
        className="label text-placeholder"
        {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
      >
        {title}
      </Typography>
      <div className="flex-grow flex-shrink-0 pt-1">
        <div className="border-b-[2px] border-dashed border-normal" />
      </div>
      <Typography
        placeholder=""
        className={`${className || ""} label text-primary_normal`}
        {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
      >
        {value || "--"}
      </Typography>
    </div>
  );
};

export default CardItemRow;
