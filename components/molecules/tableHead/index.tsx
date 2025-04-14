import React from "react";
import Sort from "../sort";
import { Typography } from "@material-tailwind/react";

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
    <thead className={`${className || ""} top-0 z-[9999] bg-tertiary h-10 `}>
      <tr>
        {tableHead.map((head) => {
          return (
            <th
              key={head.key}
              className={` ${head.className || ""} text-right px-5 py-[6px]`}
            >
              {head.isSorted ? (
                <div className=" flex items-center">
                  <Typography className="table-head py-1 text-secondary">
                    {head.value}
                  </Typography>
                  <Sort />
                </div>
              ) : (
                <div className="flex items-center">
                  <Typography className="table-head py-1 text-secondary">
                    {head.value}
                  </Typography>
                </div>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
