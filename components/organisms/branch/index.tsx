import React, { useState } from "react";
import { AddIcon } from "@components/atoms/icons";
import BranchCreateDialog from "../dialogs/branch/branchCreateDialog";
import BranchList from "./branchList";
import { IconButton } from "@material-tailwind/react";
import useGetUser from "@hooks/auth/useGetUser";
import { useBranchStore } from "@store/branch";

const Branch = () => {
  const [open, setOpen] = useState(false);
  const { setBranchId } = useBranchStore();

  const { data: userInfo } = useGetUser();

  return (
    <div className=" flex flex-col h-full bg-white rounded-lg shadow-small">
      {userInfo?.isClasorAdmin ? (
        <div className="flex items-center gap-2 p-3 justify-end border-b-2 border-normal">
          <IconButton
            {...({} as React.ComponentProps<typeof IconButton>)}
            className="bg-primary-normal w-6 h-6 flex justify-center"
            onClick={() => {
              setOpen(true);
              setBranchId(null);
            }}
          >
            <AddIcon className="w-4 h-4 stroke-white" />
          </IconButton>
        </div>
      ) : null}
      {open ? <BranchCreateDialog setOpen={setOpen} /> : null}
      <div className="branch-wrapper p-3 overflow-y-auto overflow-x-hidden flex-grow">
        <BranchList branchId={null} />
      </div>
    </div>
  );
};

export default Branch;
