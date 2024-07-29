import React from "react";
import Text from "@components/atoms/typograghy/text";

interface IProps {
  title: string;
  value?: string;
}

const CardItemRow = ({ value, title }: IProps) => {
  return (
    <div className="flex items-center h-6 gap-2">
      <Text className="text-[12px] text-placeholder font-normal leading-[16.8px] -tracking-[0.12px]">
        {title}
      </Text>
      <div className="flex-grow flex-shrink-0 pt-1">
        <div className="border-b-[2px] border-dashed border-normal" />
      </div>
      <Text className="text-[12px] text-primary font-normal leading-[16.8px] -tracking-[0.12px]">
        {value || "--"}
      </Text>
    </div>
  );
};

export default CardItemRow;
