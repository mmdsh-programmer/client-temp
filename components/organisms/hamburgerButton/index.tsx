"use client";

import { CancelIcon, MoreLineIcon } from "../../atoms/icons";

import { Button } from "@material-tailwind/react";
import React from "react";

export interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const HamburgerButton = ({ isOpen, setIsOpen }: IProps) => {
  return (
    <Button
      onClick={() => {
        return setIsOpen(!isOpen);
      }}
      className="w-4 mr-3 bg-white px-4 py-2 md:hidden"
    >
      <span>{isOpen ? <CancelIcon className="w-4 h-4" /> : <MoreLineIcon className="w-4 h-4" />}</span>
    </Button>
  );
};

export default HamburgerButton;
