import React from "react";
import CardItemRow from "./cardItemRow";
import { Typography } from "@material-tailwind/react";

interface IProps {
  name: string | React.ReactNode;
  description: { title: string; value?: string; className?: string }[];
  cardAction?: React.JSX.Element;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const MobileCard = ({
  name,
  cardAction,
  icon,
  className,
  description,
  onClick,
}: IProps) => {
  return (
    <div
      className={`${className || ""} cursor-pointer flex flex-col w-full shadow-xSmall bg-primary rounded-lg p-4 gap-4`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center w-full gap-[10px]">
        <div className="flex items-start max-w-[70%] gap-3 flex-grow">
          {icon}
          {typeof name === "string" ? (
            <Typography className="title_t2 !text-primary max-w-full truncate">
              {name}
            </Typography>
          ) : (
            <Typography className="text-primary title_t2 max-w-full truncate">
              {name}
            </Typography>
          )}
        </div>
        <div
          className="flex shrink-0"
          onClick={(e) => {
            return e.stopPropagation();
          }}
        >
          {cardAction}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {description.map((desc) => {
          return (
            <CardItemRow
              key={desc.value}
              title={desc.title}
              value={desc.value}
              className={desc.className}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MobileCard;
