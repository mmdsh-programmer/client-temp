import React from "react";
import { AddIcon } from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";

interface IProps {
  onClick: () => void;
}

const TabletHeaderList = ({ onClick }: IProps) => {
  return (
    <Button
      className="rounded-lg h-9 w-9 p-0 bg-purple-normal "
      onClick={onClick}
    >
      <AddIcon className="h-5 w-5 stroke-white" />
    </Button>
  );
};

export default TabletHeaderList;
