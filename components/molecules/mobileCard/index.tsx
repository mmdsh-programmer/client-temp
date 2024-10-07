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
        <div className="flex items-center gap-3">
          {icon}
          {typeof name === "string" ? (
            <Typography className="text-primary title_t2 flex-grow text-ellipsis whitespace-nowrap">
              {name}
            </Typography>
          ) : (
            name
          )}
        </div>
        <div
          className="flex"
          onClick={(e) => {
            return e.stopPropagation();
          }}
        >
          {cardAction}
        </div>
      </div>
      {description.map((desc) => {
        return (
          <div key={desc.value} className="flex flex-col gap-3">
            <CardItemRow
              title={desc.title}
              value={desc.value}
              className={desc.className}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MobileCard;
