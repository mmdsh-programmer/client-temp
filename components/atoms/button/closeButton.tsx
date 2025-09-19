import React from "react";
import { Button } from "@material-tailwind/react";
import { XIcon } from "../icons";

interface IProps {
  onClose: () => void;
  disabled?: boolean;
}

const CloseButton = ({ onClose, disabled }: IProps) => {
  return (
    <Button
      className="close-button bg-transparent shadow-none hover:shadow-none outline-none p-0"
      onClick={onClose}
      disabled={disabled}
      {...({} as React.ComponentProps<typeof Button>)}
    >
      <XIcon className="fill-icon-hover w-6 h-6" />
    </Button>
  );
};

export default CloseButton;
