import GroupMenu from "../groupMenu";
import { IGetGroups } from "@interface/group.interface";
import React from "react";
import { Typography } from "@material-tailwind/react";
import { UserGroupIcon } from "@components/atoms/icons";

interface IProps {
  group: IGetGroups;
}

const GroupItem = ({ group }: IProps) => {
  return (
    <div className="repo-group-item flex justify-between items-center gap-3">
      <div className="w-10 h-10 flex justify-center items-center border-[1px] border-normal rounded-full ">
        <UserGroupIcon className="w-7 h-7 overflow-hidden" />
      </div>
      <div className="flex flex-col flex-grow">
        <Typography
          placeholder=""
          className="title_t3 text-primary_normal"
          {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
        >
          {group.title}
        </Typography>
        <Typography
          placeholder=""
          className="label text-primary_normal"
          {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
        >
          {group.description}
        </Typography>
      </div>
      <GroupMenu group={group} />
    </div>
  );
};

export default GroupItem;
