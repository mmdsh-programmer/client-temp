import React from "react";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import useGetGroups from "@hooks/group/useGetGroups";
import { Spinner } from "@material-tailwind/react";
import GroupItem from "../../molecules/groupItem";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";

const GroupList = () => {
  const getRepo = useRecoilValue(repoAtom);
  const repoId = getRepo!.id;
  const { data: getGroups, isFetching, isLoading } = useGetGroups(repoId, 20);
  return (
    <div className="flex flex-col gap-2 !h-[470px] xs:!h-[350px] overflow-auto">
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
