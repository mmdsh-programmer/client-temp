import React from "react";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import useGetGroups from "@hooks/group/useGetGroups";
import { Spinner } from "@material-tailwind/react";
import GroupItem from "./groupItem";
import Text from "@components/atoms/typograghy/text";

const GroupList = () => {
  const getRepo = useRecoilValue(repoAtom);
  const repoId = getRepo!.id;
  const { data: getGroups, isFetching, isLoading } = useGetGroups(repoId, 10);
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
            <Text> هنوز گروهی نساخته اید </Text>
          );
        })
      )}
    </>
  );
};

export default GroupList;
