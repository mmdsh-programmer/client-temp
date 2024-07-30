import React from "react";
import Text from "./text";

interface IProps {
  children: React.ReactNode;
}

const WarningText = ({ children }: IProps) => {
  return (
    <Text
      className="text-error text-xs w-full h-5"
    >
      {children}
    </Text>
  );
};

export default WarningText;
