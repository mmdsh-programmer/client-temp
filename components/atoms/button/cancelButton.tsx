import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/utils/cn";

const CancelButton = ({ onClick, disabled, className, children, ...props }: ButtonProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "cancel-button min-w-[100px]",
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
