import React from "react";
import { AddIcon } from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";

interface IProps {
  onClick: () => void;
}

const MobileHeaderList = ({ onClick }: IProps) => {
  return (
    <Button
      className=" h-[54px] w-[54px] z-[99] p-0 bg-purple-normal rounded-full "
      onClick={onClick}
    >
      <AddIcon className="h-6 w-6 stroke-white" />
    </Button>
  );
};

export default MobileHeaderList;
