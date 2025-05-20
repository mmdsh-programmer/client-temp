import React from "react";
import { EEmptyList } from "@components/molecules/emptyList";
import CardView from "../repoView/cardView";
import { IRepoView } from "@interface/repo.interface";
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

  return (
    <div className="bookmarkRepo__list flex flex-col gap-6">
      <CardView {...commonProps} />
    </div>
  );
};

export default BookmarkRepoList;
