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

const MobileCard = ({ name, cardAction, icon, className, description, onClick }: IProps) => {
  return (
    <div
      className={`${className || ""} flex w-full cursor-pointer flex-col gap-4 rounded-lg bg-white p-4 shadow-xSmall`}
      onClick={onClick}
    >
      <div className="flex w-full items-center justify-between gap-[10px]">
        <div className="flex max-w-[70%] flex-grow items-start gap-3">
          {icon}
          {typeof name === "string" ? (
            <Typography
              placeholder=""
              className="title_t2 max-w-full truncate !text-primary_normal"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              {name}
            </Typography>
          ) : (
            name
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
