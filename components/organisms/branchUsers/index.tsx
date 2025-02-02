import React from "react";
import { AddIcon } from "@components/atoms/icons";
import IconTextButton from "@components/molecules/iconTextButton/iconTextButton";
import SearchInput from "@components/molecules/searchInput";

const BranchUsers = () => {
  return (
    <div className="flex flex-col px-5">
      <div className="h-[76px] flex justify-between items-center">
        <SearchInput />
        <IconTextButton
          text="افزودن کاربر جدید"
          icon={<AddIcon className="h-5 w-5 stroke-white pr-1" />}
          classNameText="text-white text-[13px] leading-[19.5px] -tracking-[0.13px] font-medium !px-2  font-iranYekan"
          classNameButton=" rounded-lg h-9 !px-[6px] bg-purple-normal "
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default BranchUsers;
