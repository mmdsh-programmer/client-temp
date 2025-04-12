import React, { useMemo } from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import CardView from "../repoView/cardView";
import { ERepoGrouping } from "@interface/enums";
import { Spinner } from "@material-tailwind/react";
import { repoSearchParamAtom } from "@atom/repository";
import useGetAccessList from "@hooks/repository/useGetAccessList";
import useGetAllRepositories from "@hooks/repository/useGetAllRepositories";
import useGetBookmarkList from "@hooks/repository/useGetBookmarkList";
import useGetMyRepoList from "@hooks/repository/useGetMyRepoList";
import { useRecoilValue } from "recoil";

const AllRepoList = () => {
  // TODO REFACTOR REQUIRED - REMOVE repoSearchParamAtom - REMOVE DOUBLE USAGE OF useGetAllRepositories
  const getSearchParam = useRecoilValue(repoSearchParamAtom);
  const repoType = getSearchParam?.repoType;
  const search = getSearchParam?.search;

  const allRepos = useGetAllRepositories(20, undefined, true);
  const searchAllRepos = useGetAllRepositories(20, search, true);
  const myRepos = useGetMyRepoList(
    20,
    repoType === ERepoGrouping.ARCHIVE_REPO,
    search,
    false,
    repoType === ERepoGrouping.MY_REPO ||
      repoType === ERepoGrouping.ARCHIVE_REPO
  );
  const accessRepos = useGetAccessList(
    20,
    search,
    repoType === ERepoGrouping.ACCESS_REPO
  );
  const bookmarkRepos = useGetBookmarkList(
    20,
    search,
    repoType === ERepoGrouping.BOOKMARK_REPO
  );

  const {
    data: repoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useMemo(() => {
    if (search) {
      switch (repoType) {
        case ERepoGrouping.MY_REPO:
        case ERepoGrouping.ARCHIVE_REPO:
          return myRepos;
        case ERepoGrouping.ACCESS_REPO:
          return accessRepos;
        case ERepoGrouping.BOOKMARK_REPO:
          return bookmarkRepos;
        default:
          return searchAllRepos;
      }
    } else {
      return allRepos;
    }
  }, [
    repoType,
    search,
    allRepos,
    searchAllRepos,
    myRepos,
    accessRepos,
    bookmarkRepos,
  ]);

  const isLoadingAllRepos = allRepos?.isLoading;
  const listLength = repoList?.pages[0].total;

  const renderList = () => {
    if (listLength)
      return (
        <CardView
          isLoading={isLoadingAllRepos || isLoading}
          getRepoList={repoList}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          type={search ? EEmptyList.FILTER : EEmptyList.DASHBOARD}
        />
      );
    return (
      <EmptyList type={search ? EEmptyList.FILTER : EEmptyList.DASHBOARD} />
    );
  };

  return (
    <div className={`${search ? "searchRepo__list" :"allRepo__list"} flex flex-col h-full min-h-[calc(100vh-340px)] gap-y-4`}>
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

export default React.memo(AllRepoList);
