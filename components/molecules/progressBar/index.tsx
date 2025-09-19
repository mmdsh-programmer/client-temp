import { IReport } from "@interface/repo.interface";
import React from "react";
import { Typography } from "@material-tailwind/react";

interface IProps {
  report?: IReport;
}

const ProgressBar = ({ report }: IProps) => {
  const usage = report?.podSpaceStatus.storageUsage;
  const total = report?.podSpaceStatus.storageLimit;

  const volumeUnit = (space: number | undefined) => {
    if (space !== undefined) {
      let remainingSpace = space;
      let count = 0;

      while (remainingSpace >= 1024) {
        remainingSpace = Math.floor(remainingSpace / 1024);
        count += 1;
      }

      switch (count) {
        case 3:
          return `${remainingSpace} گیگابایت`;
        case 2:
          return `${remainingSpace} مگابایت`;
        case 1:
          return `${remainingSpace} کیلوبایت`;
        default:
          return `${remainingSpace} بایت`;
      }
    }
    return "-";
  };

  return (
    <Typography
      placeholder="progress-bar"
      className="font-iranYekan text-xs text-primary_normal truncate cursor-default"
      {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
    >
      {volumeUnit(usage)} از {volumeUnit(total)}
    </Typography>
  );
};
export default ProgressBar;
