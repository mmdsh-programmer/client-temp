import React from "react";
import { Typography } from "@material-tailwind/react";

interface IProps {
  className?: string;
  children: React.ReactNode;
}

const Text = ({ className, children }: IProps) => {
  return <Typography placeholder="text" className={`${className || ""} font-iranYekan`}>{children}</Typography>;
};

export default Text;
