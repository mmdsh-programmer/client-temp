import React from "react";
import { QuestionIcon } from "@components/atoms/icons";
import TooltipComponent from "../tooltip";
import { Typography } from "@material-tailwind/react";

interface IProps {
  repoNumber: number;
  icon: React.ReactNode;
  tooltipContent: string;
}

const RepoTypeCardFooter = ({ icon, repoNumber, tooltipContent }: IProps) => {
  return (
    <>
      <div className="flex items-center w-full overflow-hidden ml-2">
        <div className="max-h-4 max-w-4 min-h-2 min-w-2">{icon}</div>
        <div className="max-w-[100px] overflow-hidden">
          <Typography
            placeholder=""
            className="font-iranYekan text-secondary text-[12px] mr-1 truncate"
            title={repoNumber !== 0 ? `${repoNumber} مخزن` : "مخزنی وجود ندارد"}
          >
            {repoNumber !== 0 ? `${repoNumber} مخزن` : "مخزنی وجود ندارد"}
          </Typography>
        </div>
      </div>
      <TooltipComponent content={tooltipContent}>
        <QuestionIcon className="h-5 w-5" />
      </TooltipComponent>
    </>
  );
};

export default RepoTypeCardFooter;
