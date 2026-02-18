"use client";

import React, { useState } from "react";
import { Button } from "@components/ui/button";
import { AddIcon } from "@components/atoms/icons";
import BranchCreateDialog from "@components/organisms/dialogs/branch/branchCreateDialog";
import BranchList from "./branchList";
import useGetUser from "@hooks/auth/useGetUser";
import { useBranchStore } from "@store/branch";

const Branch = () => {
  const [open, setOpen] = useState(false);
  const { setBranchId } = useBranchStore();
  const { data: userInfo } = useGetUser();

  return (
    <div className="flex h-full flex-col rounded-lg bg-white shadow-small">
      {userInfo?.isClasorAdmin ? (
        <div className="flex items-center justify-end gap-2 border-b-2 border-normal p-3">
          <Button
            size="icon"
            className="hover:bg-primary-normal/90 flex h-6 w-6 justify-center bg-primary-normal"
            onClick={() => {
              setBranchId(null);
              setOpen(true);
            }}
          >
            <AddIcon className="h-4 w-4 stroke-white" />
          </Button>
          
          <BranchCreateDialog open={open} onOpenChange={setOpen} />
        </div>
      ) : null}
      <div className="branch-wrapper flex-grow overflow-y-auto overflow-x-hidden p-3">
        <BranchList branchId={null} />
      </div>
    </div>
  );
};

export default Branch;