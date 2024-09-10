import { AddIcon } from "@components/atoms/icons";
import IconTextButton from "@components/molecules/iconTextButton/iconTextButton";
import React from "react";

interface IProps {
  buttonText: string;
  onClick: (open: boolean) => void;
}
  
const DesktopHeaderList = ({ buttonText, onClick }: IProps) => {
  return (  
    <>
      <IconTextButton
        text={buttonText}
        icon={<AddIcon className="h-5 w-5 stroke-white pr-1" />}
        classNameText="text-white text-[13px] leading-[19.5px] -tracking-[0.13px] font-medium !px-2  font-iranYekan"
        classNameButton="rounded-lg h-9 !px-[6px] bg-purple-normal "
        onClick={() => onClick(true)}
      />
    </>
  );
};

export default DesktopHeaderList;
