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
      placeholder="close button"
      className="bg-transparent shadow-none hover:shadow-none outline-none p-0"
      onClick={onClose}
      disabled={disabled}
    >
      <XIcon className="fill-icon-hover w-6 h-6" />
    </Button>
  );
};

export default CloseButton;
