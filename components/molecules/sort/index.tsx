import React from "react";
import { FillArrow } from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";

interface IProps {
  onClick?: () => void;
}

const Sort = ({onClick}: IProps) => {
  return (
    <div className="flex flex-col mr-[11px]">
      <Button className="p-0 bg-transparent shadow-none" placeholder="sort button"  onClick={onClick}>
        <FillArrow className="w-[9px] h-[9px] fill-gray-400" />
      </Button>
      <Button className="p-0 bg-transparent shadow-none" placeholder="sort button"  onClick={onClick}>
        <FillArrow className="w-[9px] h-[9px] fill-gray-400 rotate-180" />
      </Button>
    </div>
  );
};

export default Sort;
