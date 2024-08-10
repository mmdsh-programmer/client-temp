import React from "react";
import CardItemRow from "./cardItemRow";
import { Typography } from "@material-tailwind/react";

interface IProps {
  name: string;
  createDate?: string;
  creator?: string;
  cardAction?: React.JSX.Element;
  icon?: React.ReactNode;
}

const MobileCard = ({
  name,
  createDate,
  creator,
  cardAction,
  icon,
}: IProps) => {
  return (
    <div className="flex flex-col w-full shadow-xSmall bg-primary rounded-lg p-4 gap-4">
      <div className="flex justify-between items-center w-full gap-[10px]">
        <div className="flex items-center gap-3">
          {icon}
          <Typography className="title_t2 flex-grow text-ellipsis whitespace-nowrap">
            {name}
          </Typography>
        </div>
        <div className="flex">{cardAction}</div>
      </div>
      {creator ? (
        <div className="flex flex-col gap-3">
          <CardItemRow title="تاریخ ایجاد" value={createDate} />
          <CardItemRow title="سازنده" value={creator} />
        </div>
      ) : null}
    </div>
  );
};

export default MobileCard;
