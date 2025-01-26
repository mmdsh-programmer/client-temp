import React from "react";
import { Button } from "@material-tailwind/react";
import { XIcon } from "../icons";
import { CloseButtonProps } from "react-toastify/dist/components";

const ToastCloseButton = ({ closeToast }: CloseButtonProps) => {
    return (
      <Button
        placeholder="close button"
        className="bg-transparent shadow-none hover:shadow-none outline-none p-0"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          closeToast(e);
        }}
      >
        <XIcon className="fill-white w-6 h-6" />
      </Button>
    );
  };

export default ToastCloseButton;
