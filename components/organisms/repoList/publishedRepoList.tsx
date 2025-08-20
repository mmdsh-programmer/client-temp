import React from "react";
import { EEmptyList } from "@components/molecules/emptyList";
import CardView from "../repoView/cardView";
import { IRepoView } from "@interface/repo.interface";
import { useRepoSearchParamStore } from "@store/repoSearchParam";
import useGetMyRepoList from "@hooks/repository/useGetMyRepoList";

const PublishedRepoList = () => {
  const { repoSearchParam } = useRepoSearchParamStore();
  const search = repoSearchParam?.search;

  const {
    data: getMyPublishedRepo,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetMyRepoList(20, false, search || undefined, true, true);

  const commonProps: IRepoView = {
    isLoading,
    getRepoList: getMyPublishedRepo,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    type: search ? EEmptyList.FILTER : EEmptyList.PUBLISHED_REPO,
  };

  return (
    <div className="publishedRepo__list flex flex-col gap-6">
      <CardView {...commonProps} />
    </div>
  );
};

export default PublishedRepoList;
