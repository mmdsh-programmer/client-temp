import { Typography } from "@material-tailwind/react";
import React from "react";

interface IProps {
  value: string;
  className?: string;
  icon?: React.ReactNode;
}

const ChipMolecule = ({ className, value, icon }: IProps) => {
  return (
    <div
      className={`${className || ""} flex items-center justify-center rounded-full cursor-pointer`}
    >
      <Typography className="label text-primary truncate text-right lowercase  ">
        {value}
      </Typography>
      {icon}
    </div>
  );
};

export default ChipMolecule;
