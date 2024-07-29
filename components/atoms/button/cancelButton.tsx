import React from "react";
import { Button } from "@material-tailwind/react";
import Text from "../typograghy/text";

interface IProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const CancelButton = ({ onClick, disabled, children }: IProps) => {
  return (
    <Button
      placeholder="cancel button"
      variant="text"
      className="flex justify-center items-center flex-1 xs:flex-0 xs:w-[100px] h-12 xs:h-8 px-3 xs:px-1 hover:bg-gray-50 bg-gray-50 "
      onClick={onClick}
      disabled={disabled}
    >
      <Text className="text-primary text-[12px] font-medium leading-[18px] -tracking-[0.12px] ">
        {children}
      </Text>
    </Button>
  );
};

export default CancelButton;
