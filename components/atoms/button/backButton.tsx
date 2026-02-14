import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { BackIcon } from "@components/atoms/icons";
import { cn } from "@/utils/cn";

const BackButton = ({ onClick, disabled, className, ...props }: ButtonProps) => {
  return (
    <Button
      className={cn(
        "back-button h-auto w-auto bg-transparent p-3 shadow-none hover:shadow-none",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <BackIcon className="h-6 w-6 fill-icon-active" />
    </Button>
  );
};

export default BackButton;
