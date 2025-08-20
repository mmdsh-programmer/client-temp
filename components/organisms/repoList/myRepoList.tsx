import React from "react";
import { EEmptyList } from "@components/molecules/emptyList";
import CardView from "../repoView/cardView";
import { IRepoView } from "@interface/repo.interface";
import { useRepoSearchParamStore } from "@store/repoSearchParam";
import useGetMyRepoList from "@hooks/repository/useGetMyRepoList";

interface IProps {
  archived: boolean;
}

const MyRepoList = ({ archived }: IProps) => {
  const { repoSearchParam } = useRepoSearchParamStore();
  const search = repoSearchParam?.search;

  const {
    data: getMyRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetMyRepoList(20, archived, search || undefined, undefined, true);

  const type = () => {
    if (search) {
      return EEmptyList.FILTER;
    }
    if (archived) {
      return EEmptyList.ARCHIVE_REPO;
    }
    return EEmptyList.MY_REPO;
  };

  const commonProps: IRepoView = {
    isLoading,
    getRepoList: getMyRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    type: type(),
  };

  return (
    <div className={`${archived ? "archiveRepo__list" : "myRepo__list"} flex flex-col gap-6`}>
      <CardView {...commonProps} />
    </div>
  );
};

export default MyRepoList;
