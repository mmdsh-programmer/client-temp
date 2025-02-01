"use client";

import React, { useState } from "react";
import Branch from "@components/organisms/branch";
import BranchInfo from "@components/organisms/branch/branchInfo";
import { Button, Typography } from "@material-tailwind/react";
import { AddIcon } from "@components/atoms/icons";
import PositionCreateDialog from "@components/organisms/dialogs/position/createPositionDialog";

const BranchManagementPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="category-header flex justify-between items-center px-4 xs:px-0">
        <Typography className="title_t1 text-primary">لیست شعبات</Typography>
        <Button
          placeholder="create button"
          className="bg-purple-normal flex gap-2 "
          onClick={() => {
            return setOpen(true);
          }}
        >
          <Typography className="title_t3 text-white">
            ایجاد گروه جدید
          </Typography>
          <AddIcon className="w-4 h-4 stroke-white" />
        </Button>
      </div>
      <div className="flex justify-evenly gap-2 h-full">
        <div className="basis-1/5 h-full">
          <Branch />
        </div>
        <div className="basis-4/5 ">
          <BranchInfo />
        </div>
      </div>
      {open ? <PositionCreateDialog setOpen={setOpen} /> : null}
    </div>
  );
};

export default BranchManagementPage;
