import React from "react";
import Text from "@components/atoms/typograghy/text";

interface IProps {
  value: string;
  className?: string;
  icon?: React.ReactNode;
}

const ChipMolecule = ({ className, value, icon }: IProps) => {
  return (
    <div
      className={`${className || ""} flex items-center justify-center rounded-full cursor-pointer`}
    >
      <Text className="truncate text-right lowercase font-normal text-xs leading-[16.8px] -tracking-[0.12]">{value}</Text>
      <>
      {icon}
      </>
    </div>
  );
};

export default ChipMolecule;
