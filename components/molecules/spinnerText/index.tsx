import { Typography } from "@material-tailwind/react";
import { Spinner } from "@components/atoms/spinner";
import React from "react";

interface IProps {
  text: string;
}

const SpinnerText = ({ text }: IProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner className="w-8 h-8 text-primary" />
      <Typography className="font-bold mr-2 font-iranYekan"> {text}</Typography>
    </div>
  );
};

export default SpinnerText;
