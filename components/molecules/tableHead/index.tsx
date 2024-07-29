import React from "react";
import Text from "@components/atoms/typograghy/text";
import Sort from "../sort";

interface IProps {
  tableHead: {
    key: string;
    value: string;
    isSorted?: boolean;
    className?: string;
  }[];
  className?: string;
}

const TableHead = ({ tableHead, className }: IProps) => {
  return (
    <thead
      className={` top-0 z-[9999] bg-tertiary h-10 `}
    >
      <tr>
        {tableHead.map((head, index) => (
          <th key={head.key} className="text-right px-5 py-[6px]">
            {head.isSorted ? (
              <div className={`flex items-center ${head.className || ""}`}>
                <Text
                  className="py-1 !font-bold text-[12px] text-ellipsis leading-[18px] -tracking-[0.12px] text-secondary"
                >
                  {head.value}
                </Text>
                <Sort />
              </div>
            ) : (
              <div className={`flex items-center ${head.className || ""}`}>
                <Text className="py-1 !font-bold text-[12px] text-ellipsis leading-[18px] -tracking-[0.12px] text-secondary">
                  {head.value}
                </Text>
                
              </div>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
