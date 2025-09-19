import React from "react";
import { Button } from "@material-tailwind/react";
import { BackIcon } from "../icons";

interface IProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const BackButton = ({ onClick, disabled, className }: IProps) => {
  return (
    <Button
      className={`${className || ""} back-button bg-transparent shadow-none hover:shadow-none outline-none p-3`}
      onClick={onClick}
      disabled={disabled}
      {...({} as React.ComponentProps<typeof Button>)}
    >
      <BackIcon className="fill-icon-active w-6 h-6" />
    </Button>
  );
};

export default BackButton;
