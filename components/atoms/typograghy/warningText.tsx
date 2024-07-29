import React from "react";
import { Typography } from "@material-tailwind/react";

interface IProps {
  children: React.ReactNode;
}

const WarningText = ({ children }: IProps) => {
  return (
    <Typography
      placeholder="warning-text"
      className="text-error text-xs w-full h-5"
    >
      {children}
    </Typography>
  );
};

export default WarningText;
