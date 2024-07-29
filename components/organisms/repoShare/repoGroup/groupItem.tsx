import React from "react";
import { IGetGroups } from "@interface/group.interface";
import { UserGroupIcon } from "@components/atoms/icons";
import Text from "@components/atoms/typograghy/text";
import GroupMenu from "./groupMenu";

interface IProps {
  group: IGetGroups;
}

const GroupItem = ({ group }: IProps) => {
  return (
    <div className="flex justify-between items-center gap-3">
      <div className="w-10 h-10 flex justify-center items-center border-[1px] border-normal rounded-full ">
        <UserGroupIcon className="w-7 h-7 overflow-hidden" />
      </div>
      <div className="flex flex-col flex-grow">
        <Text className="text-primary text-[13px] font-medium leading-[19.5px] -tracking-[0.13px]">
          {group.title}
        </Text>
        <Text className="text-primary text-[12px] font-normal leading-[16.8px] -tracking-[0.12px]">
          {group.description}
        </Text>
      </div>
      <GroupMenu group={group} />
    </div>
  );
};

export default GroupItem;
