import React from "react";
import { Button } from "@material-tailwind/react";

interface IProps {
  className?: string;
  onClick?: (e: any) => void;
  children?: React.ReactNode | string;
  disabled?: boolean;
}

const ButtonAtom = ({ className, onClick, children, disabled }: IProps) => {
  return (
    <Button
      placeholder="button"
      className={`${className}
      flex items-center justify-center
      shadow-none outline-none font-iranYekan hover:shadow-none p-0`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default ButtonAtom;
