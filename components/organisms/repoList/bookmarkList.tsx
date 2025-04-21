import EmptyList, { EEmptyList } from "@components/molecules/emptyList";

import CardView from "../repoView/cardView";
import { IRepoView } from "@interface/repo.interface";
import React from "react";
import { Spinner } from "@material-tailwind/react";
import { repoSearchParamAtom } from "@atom/repository";
import useGetBookmarkList from "@hooks/repository/useGetBookmarkList";
import { useRecoilValue } from "recoil";

const BookmarkRepoList = () => {
  const getSearchParam = useRecoilValue(repoSearchParamAtom);
  const search = getSearchParam?.search;

  const {
    data: getBookmarkRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetBookmarkList(10, search || undefined, true);

  const commonProps: IRepoView = {
    isLoading,
    getRepoList: getBookmarkRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    type: search ? EEmptyList.FILTER : EEmptyList.BOOKMARK_REPO,
  };

  const listLength = getBookmarkRepoList?.pages[0].total;

  const renderList = () => {
    if (listLength) return <CardView {...commonProps} />;
    return (
      <EmptyList type={search ? EEmptyList.FILTER : EEmptyList.BOOKMARK_REPO} />
    );
  };

  return (
    <div className="bookmarkRepo__list flex flex-col gap-6">
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

export default BookmarkRepoList;
