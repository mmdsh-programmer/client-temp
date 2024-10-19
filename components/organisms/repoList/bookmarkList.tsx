import React from "react";
import CardView from "../repoView/cardView";
import { EEmptyList } from "@components/molecules/emptyList";
import { EListMode } from "@interface/enums";
import MobileView from "../repoView/mobileView";
import RenderIf from "@components/atoms/renderIf";
import TableView from "../repoView/tableView";
import { listModeAtom } from "@atom/app";
import useGetBookmarkList from "@hooks/repository/useGetBookmarkList";
import { useRecoilValue } from "recoil";
import { IRepoView } from "@interface/repo.interface";

const BookmarkRepoList = () => {
  const mode = useRecoilValue(listModeAtom);
  const {
    data: getBookmarkRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetBookmarkList(10, undefined, true);

  const commonProps: IRepoView = {
    isLoading,
    getRepoList: getBookmarkRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
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
