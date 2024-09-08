import React from "react";
import { Typography } from "@material-tailwind/react";

interface IProps {
  value: string;
  className?: string;
  icon?: React.ReactNode;
  actionIcon?: React.ReactNode;
}

const ChipMolecule = ({ className, value, icon, actionIcon }: IProps) => {
  return (
    <div
      className={`${className || ""} flex gap-2 items-center justify-center rounded-full cursor-pointer`}
    >
      {icon ? <div className="w-8 h-8 ">{icon}</div> : null}
      <Typography title={value} className="label truncate text-right lowercase ">
        {value}
      </Typography>
      {actionIcon}
    </div>
  );
};

export default ChipMolecule;
