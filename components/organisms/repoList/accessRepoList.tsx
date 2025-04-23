import EmptyList, { EEmptyList } from "@components/molecules/emptyList";

import CardView from "../repoView/cardView";
import { IRepoView } from "@interface/repo.interface";
import React from "react";
import { Spinner } from "@material-tailwind/react";
import { repoSearchParamAtom } from "@atom/repository";
import useGetAccessList from "@hooks/repository/useGetAccessList";
import { useRecoilValue } from "recoil";

const AccessRepoList = () => {
  const getSearchParam = useRecoilValue(repoSearchParamAtom);
  const search = getSearchParam?.search;

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

  const listLength = getAccessRepoList?.pages[0].total;

  const renderList = () => {
    if (listLength) return <CardView {...commonProps} />;
    return (
      <EmptyList type={search ? EEmptyList.FILTER : EEmptyList.ACCESS_REPO} />
    );
  };

  return (
    <div className="accessRepo__list flex flex-col gap-6">
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

export default AccessRepoList;
