import React, { useState } from "react";

import { AddIcon } from "@components/atoms/icons";
import DomainPublicFeedList from "./domainPublicFeedList";
import IconTextButton from "@components/molecules/iconTextButton/iconTextButton";
import PublicFeedCreateDialog from "../dialogs/publicFeed/publicFeedCreateDialog";

const DomainPublicFeed = () => {
  const [openCreateFeedDialog, setOpenCreateFeedDialog] =
    useState(false);

  return (
    <div className="flex flex-col h-full pb-5 px-5">
      <div className="h-[76px] min-h-[76px] flex justify-end items-center">
        <IconTextButton
          text="ایجاد خبرنامه جدید"
          icon={<AddIcon className="h-5 w-5 stroke-white pr-1" />}
          classNameText="text-white text-[13px] leading-[19.5px] -tracking-[0.13px] font-medium !px-2  font-iranYekan"
          classNameButton=" rounded-lg h-9 !px-[6px] bg-secondary "
          onClick={() => {
            return setOpenCreateFeedDialog(true);
          }}
        />
      </div>
      <DomainPublicFeedList />
      {openCreateFeedDialog ? (
        <PublicFeedCreateDialog setOpen={setOpenCreateFeedDialog} />
      ) : null}
    </div>
  );
};

export default DomainPublicFeed;
