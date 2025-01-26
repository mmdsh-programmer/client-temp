import React from "react";
import CardView from "../repoView/cardView";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import useGetBookmarkList from "@hooks/repository/useGetBookmarkList";
import { useRecoilValue } from "recoil";
import { IRepoView } from "@interface/repo.interface";
import RepoSearch from "@components/molecules/repoSearch";
import { repoSearchParamAtom } from "@atom/repository";
import { Spinner } from "@material-tailwind/react";

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

  return (
    <div className="flex flex-col gap-6">
      {!isLoading || search ? <RepoSearch /> : null}
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      ) : listLength ? (
        <CardView {...commonProps} />
      ) : (
        <EmptyList
          type={search ? EEmptyList.FILTER : EEmptyList.BOOKMARK_REPO}
        />
      )}
    </div>
  );
};

export default BookmarkRepoList;
