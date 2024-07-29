import React from "react";
import { Typography } from "@material-tailwind/react";

interface IProps {
  children: React.ReactNode;
}

const Title = ({ children }: IProps) => {
  return (
    <Typography
      placeholder="title"
      className="text-primary text-[16px] leading-6 -tracking-[0.32px] font-medium font-iranYekan"
    >
      {children}
    </Typography>
  );
};

export default Title;
