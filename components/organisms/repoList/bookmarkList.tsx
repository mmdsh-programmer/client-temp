import React from "react";
import RenderIf from "@components/atoms/renderIf";
import useGetBookmarkList from "@hooks/repository/useGetBookmarkList";
import { EListMode } from "@interface/enums";
import { useRecoilValue } from "recoil";
import { listMode } from "@atom/app";
import TableView from "../repoView/tableView";
import MobileView from "../repoView/mobileView";
import CardView from "../repoView/cardView";
import { EEmptyList } from "@components/molecules/emptyList";
import { IRepoView } from ".";

const BookmarkRepoList = () => {
  const mode = useRecoilValue(listMode);
  const {
    data: getBookmarkRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useGetBookmarkList(10, undefined, true);

  const commonProps: IRepoView = {
    isLoading,
    getRepoList: getBookmarkRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    type: EEmptyList.BOOKMARK_REPO,
  };

  return (
    <>
      <RenderIf isTrue={mode === EListMode.table}>
        <>
          <div className="hidden xs:block">
            <TableView {...commonProps} />
          </div>
          <div className="flex flex-col h-full min-h-[calc(100vh-340px)] xs:hidden gap-y-4 ">
            <MobileView {...commonProps} />
          </div>
        </>
      </RenderIf>
      <RenderIf isTrue={mode === EListMode.card}>
        <CardView {...commonProps} />
      </RenderIf>
    </>
  );
};

export default BookmarkRepoList;
