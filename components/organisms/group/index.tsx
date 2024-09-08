import React from "react";
import { AddIcon } from "@components/atoms/icons";
import { Button, Typography } from "@material-tailwind/react";
import GroupList from "./groupList";
import { useSetRecoilState } from "recoil";
import { createGroupAtom } from "@atom/group";

const Groups = () => {
  const setCreateGroupModal = useSetRecoilState(createGroupAtom);

  return (
    <div className="mt-4">
      <div className="border-b-[1px] bg-gray-200 w-full" />
      <div className="pt-5 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <Typography className="title_t4 text-secondary ">
            لیست گروه‌ها
          </Typography>
          <Button
            placeholder="create group"
            className="flex justify-between items-center shadow-none hover:shadow-none px-1 h-8 bg-white hover:bg-transparent border-[1px] border-normal"
            onClick={() => {
              setCreateGroupModal(true);
            }}
          >
            <AddIcon className="h-5 w-5 stroke-icon-active" />
            <Typography className="title_t4 text-primary px-2">
              ایجاد گروه
            </Typography>
          </Button>
        </div>
        <GroupList />
      </div>
    </div>
  );
};

export default Groups;
