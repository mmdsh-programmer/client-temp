import React, { useState } from "react";
import { AddIcon } from "@components/atoms/icons";
import BranchGroupList from "./branchGroupList";
import IconTextButton from "@components/molecules/iconTextButton/iconTextButton";
import PositionCreateDialog from "../dialogs/position/positionCreateDialog";
import SearchInput from "@components/molecules/searchInput";
import BranchGroupsMobileView from "./branchGroupMobileView";

const BranchGroups = () => {
  const [openCreatePositionDialog, setOpenCreatePositionDialog] = useState(false);

  return (
    <div className="flex h-full flex-col px-5 pb-5">
      <div className="flex h-[76px] min-h-[76px] items-center justify-between">
        <SearchInput />
        <IconTextButton
          text="ایجاد سمت جدید"
          icon={<AddIcon className="h-5 w-5 stroke-white pr-1" />}
          classNameText="text-white text-[13px] leading-[19.5px] -tracking-[0.13px] font-medium !px-2  font-iranYekan"
          classNameButton=" rounded-lg h-9 !px-[6px] bg-primary-normal "
          onClick={() => {
            return setOpenCreatePositionDialog(true);
          }}
        />
      </div>
      <div className="hidden h-full xs:block">
        <BranchGroupList />
      </div>
      <div className="block h-full xs:hidden">
        <BranchGroupsMobileView />
      </div>
      {openCreatePositionDialog ? (
        <PositionCreateDialog setOpen={setOpenCreatePositionDialog} />
      ) : null}
    </div>
  );
};

export default BranchGroups;
