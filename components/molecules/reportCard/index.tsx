import React from "react";
import { Typography } from "@material-tailwind/react";

interface IProps {
  title: string;
  icon: React.ReactNode;
  description: {
    label: string | number;
    value: string | number;
  }[];
}

const ReportCard = ({ title, icon, description }: IProps) => {
  return (
    <div className="w-full bg-primary rounded-lg p-4 max-h-[150px]">
      <div className="float-right ml-2 p-[18px] bg-purple-light rounded-full">
        {icon}
      </div>
      <div className="block md:flex flex-col gap-2 flex-grow items-start">
        <Typography className="mt-3 md:mt-0 title_t1 font-bold">
          {title}
        </Typography>
        <div className="flex mt-2 md:mt-0 w-full gap-2 justify-between">
          {description.map((descItem) => {
            return (
              <div key={descItem.label} className="flex flex-wrap gap-x-1 items-center ">
                <Typography className="body_b3 text-hint">
                  {descItem.label}
                </Typography>
                <Typography className="caption_c2">{descItem.value}</Typography>
              </div>
            );
          })}
        </div>
      </div>
      <div />
    </div>
  );
};

export default ReportCard;
