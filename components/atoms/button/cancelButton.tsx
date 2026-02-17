import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/utils/cn";

const CancelButton = ({ onClick, disabled, className, children, ...props }: ButtonProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "cancel-button flex h-12 flex-1 items-center justify-center px-3 xs:h-8 xs:w-[100px] xs:flex-none xs:px-1",
        "bg-gray-50 hover:bg-gray-50",
        "text__label__button text-primary_normal",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CancelButton;
