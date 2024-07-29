import React from "react";
import Button from "@components/atoms/button";
import { AddIcon } from "@components/atoms/icons";

interface IProps {
  onClick: () => void;
}

const TabletHeaderList = ({ onClick }: IProps) => {
  return (
    <Button
      className="rounded-lg h-9 w-9 bg-purple-normal "
      onClick={onClick}
    >
      <AddIcon className="h-5 w-5 stroke-white" />
    </Button>
  );
};

export default TabletHeaderList;
