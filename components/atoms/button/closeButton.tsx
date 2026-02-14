import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { XIcon } from "@components/atoms/icons";
import { cn } from "@/utils/cn";

const CloseButton = ({ className, disabled, onClick, ...props }: ButtonProps) => {
  return (
    <Button
      className={cn(
        "close-button bg-transparent shadow-none hover:shadow-none p-0 h-auto w-auto",
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      <XIcon className="fill-icon-hover h-6 w-6" />
    </Button>
  );
};

export default CloseButton;
