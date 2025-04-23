import EmptyList, { EEmptyList } from "@components/molecules/emptyList";

import CardView from "../repoView/cardView";
import { IRepoView } from "@interface/repo.interface";
import React from "react";
import { Spinner } from "@material-tailwind/react";
import { repoSearchParamAtom } from "@atom/repository";
import useGetMyRepoList from "@hooks/repository/useGetMyRepoList";
import { useRecoilValue } from "recoil";

const PublishedRepoList = () => {
  const getSearchParam = useRecoilValue(repoSearchParamAtom);
  const search = getSearchParam?.search;

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

  const listLength = getMyPublishedRepo?.pages[0].total;

  const renderList = () => {
    if (listLength) return <CardView {...commonProps} />;
    return (
      <EmptyList
        type={search ? EEmptyList.FILTER : EEmptyList.PUBLISHED_REPO}
      />
    );
  };

  return (
    <div className="publishedRepo__list flex flex-col gap-6">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="purple" />
        </div>
      ) : (
        renderList()
      )}
    </div>
  );
};

export default PublishedRepoList;
