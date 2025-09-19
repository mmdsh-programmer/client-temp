import { Button, Typography } from "@material-tailwind/react";

import React from "react";

interface IProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const CancelButton = ({ onClick, disabled, children, className }: IProps) => {
  return (
    <Button
      placeholder="cancel button"
      variant="text"
      className={`${className || ""} cancel-button flex justify-center items-center flex-1 xs:flex-0 xs:w-[100px] h-12 xs:h-8 px-3 xs:px-1 hover:bg-gray-50 bg-gray-50`}
      onClick={onClick}
      disabled={disabled}
      {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
    >
      <Typography 
        className="text__label__button text-primary_normal"
        {...({} as  React.ComponentProps<typeof Typography>)} 
      >
        {children}
      </Typography>
    </Button>
  );
};

export default CancelButton;
