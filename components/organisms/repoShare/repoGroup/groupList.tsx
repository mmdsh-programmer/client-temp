import React from "react";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import useGetGroups from "@hooks/group/useGetGroups";
import { Spinner, Typography } from "@material-tailwind/react";
import GroupItem from "./groupItem";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";

const GroupList = () => {
  const getRepo = useRecoilValue(repoAtom);
  const {
    data: getGroups,
    isFetching,
    isLoading,
  } = useGetGroups(getRepo?.id, 10);
  return (
    <>
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
    </>
  );
};

export default GroupList;
