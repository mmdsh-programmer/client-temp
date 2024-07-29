import React from "react";
import ListMode from "@components/molecules/listMode";
import { AddIcon } from "@components/atoms/icons";
import IconTextButton from "@components/molecules/iconTextButton/iconTextButton";

interface IProps {
  buttonText: string;
  onClick: () => void;
}

const DesktopHeaderList = ({ buttonText, onClick }: IProps) => {
  return (
    <div className="flex gap-x-2">
      <IconTextButton
        text={buttonText}
        icon={<AddIcon className="h-5 w-5 stroke-white pr-1" />}
        classNameText="text-white text-[13px] leading-[19.5px] -tracking-[0.13px] font-medium !px-2"
        classNameButton="rounded-lg h-9 !px-[6px] bg-purple-normal "
        onClick={onClick}
      />
      <ListMode />
    </div>
  );
};

export default DesktopHeaderList;
