import EmptyList, { EEmptyList } from "@components/molecules/emptyList";

import GroupItem from "../../molecules/groupItem";
import React from "react";
import { Spinner } from "@material-tailwind/react";
import { repoAtom } from "@atom/repository";
import useGetGroups from "@hooks/group/useGetGroups";
import { useRecoilValue } from "recoil";

const GroupList = () => {
  const getRepo = useRecoilValue(repoAtom);
  const repoId = getRepo!.id;
  const {
 data: getGroups, isFetching 
} = useGetGroups(repoId, 20);
  return (
    <div className="repo-group-list flex flex-col gap-2 !h-[470px] xs:!h-[350px] overflow-auto">
      {isFetching ? (
        <div className="">
          <Spinner className="" color="deep-purple" />
        </div>
      ) : (
        getGroups?.pages.map((page) => {
          return page.total > 0 ? (
            page.list.map((group) => {
              return <GroupItem key={group.title} group={group} />;
            })
          ) : (
            <EmptyList type={EEmptyList.GROUP} />
          );
        })
      )}
    </div>
  );
};

export default GroupList;
