/* eslint-disable no-nested-ternary */

import React from "react";
import CardView from "../repoView/cardView";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { useRecoilValue } from "recoil";
import { IRepoView } from "@interface/repo.interface";
import useGetMyRepoList from "@hooks/repository/useGetMyRepoList";
import { repoSearchParamAtom } from "@atom/repository";
import RepoSearch from "@components/molecules/repoSearch";
import { Spinner } from "@material-tailwind/react";

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
    <div className="flex flex-col gap-6">
      {(!isLoading || search) && listLength ? <RepoSearch /> : null}
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      ) : (
        renderList()
      )}
    </div>
  );
};

export default PublishedRepoList;
