import React from "react";
import { AddIcon } from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";
import Text from "@components/atoms/typograghy/text";
import GroupList from "./groupList";
import { useSetRecoilState } from "recoil";
import { createGroupAtom } from "@atom/group";

const RepoGroup = () => {
  const setCreateGroupModal = useSetRecoilState(createGroupAtom);

  return (
    <div className="mt-4">
      <div className="border-b-[1px] bg-gray-200 w-full" />
      <div className="pt-5 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <Text className="text-secondary text-[12px] font-medium leading-[18px] -tracking-[0.12px] ">
            لیست گروه‌ها
          </Text>
          <Button
            placeholder="create group"
            className="flex justify-between items-center shadow-none hover:shadow-none px-1 h-8 bg-white hover:bg-transparent border-[1px] border-normal"
            onClick={() => {
              setCreateGroupModal(true);
            }}
          >
            <AddIcon className="h-5 w-5 stroke-icon-active" />
            <Text className="text-primary px-2 text-[12px] font-medium leading-[18px] -tracking-[0.12px]">
              ایجاد گروه
            </Text>
          </Button>
        </div>
        <GroupList />
      </div>
    </div>
  );
};

export default RepoGroup;
