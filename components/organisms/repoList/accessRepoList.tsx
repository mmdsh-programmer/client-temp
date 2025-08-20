import React from "react";
import { EEmptyList } from "@components/molecules/emptyList";
import CardView from "../repoView/cardView";
import { IRepoView } from "@interface/repo.interface";
import { useRepoSearchParamStore } from "@store/repoSearchParam";
import useGetAccessList from "@hooks/repository/useGetAccessList";

const AccessRepoList = () => {
  const { repoSearchParam } = useRepoSearchParamStore();
  const search = repoSearchParam?.search;

  const {
    data: getAccessRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetAccessList(20, search || undefined, true);

  const commonProps: IRepoView = {
    isLoading,
    getRepoList: getAccessRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    type: search ? EEmptyList.FILTER : EEmptyList.ACCESS_REPO,
  };

  return (
    <div className="accessRepo__list flex flex-col gap-6">
      <CardView {...commonProps} />
    </div>
  );
};

export default AccessRepoList;
