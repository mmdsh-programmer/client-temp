import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { AddIcon } from "@components/atoms/icons";
import GroupList from "./groupList";
import { ERoles } from "@interface/enums";
import { useGroupStore } from "@store/group";
import { useRepositoryStore } from "@store/repository";

const Groups = () => {
  const { repo: getRepo } = useRepositoryStore();
  const { setCreateGroup } = useGroupStore();

  return (
    <div className="repo-groups mt-4">
      <div className="w-full border-b-[1px] bg-gray-200" />
      <div className="flex flex-col gap-5 pt-5">
        <div className="flex items-center justify-between">
          <Typography className="title_t4 text-secondary ">لیست گروه‌ها</Typography>
          {getRepo?.roleName === ERoles.owner ? (
            <Button
              placeholder="create group"
              className="create-group-button flex h-8 items-center justify-between border-[1px] border-normal bg-white px-1 shadow-none hover:bg-transparent hover:shadow-none"
              onClick={() => {
                setCreateGroup(true);
              }}
            >
              <AddIcon className="h-5 w-5 stroke-icon-active" />
              <Typography className="title_t4 px-2 text-primary_normal">ایجاد گروه</Typography>
            </Button>
          ) : null}
        </div>
        <GroupList />
      </div>
    </div>
  );
};

export default Groups;
