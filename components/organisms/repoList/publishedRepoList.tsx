import React from "react";
import CardView from "../repoView/cardView";
import { EEmptyList } from "@components/molecules/emptyList";
import { EListMode } from "@interface/enums";
import MobileView from "../repoView/mobileView";
import RenderIf from "@components/atoms/renderIf";
import TableView from "../repoView/tableView";
import { listModeAtom } from "@atom/app";
import { useRecoilValue } from "recoil";
import { IRepoView } from "@interface/repo.interface";
import useGetMyRepoList from "@hooks/repository/useGetMyRepoList";

const PublishedRepoList = () => {
  const mode = useRecoilValue(listModeAtom);
  const {
    data: getMyPublishedRepo,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetMyRepoList(20, false, undefined, true, true);

  const commonProps: IRepoView = {
    isLoading,
    getRepoList: getMyPublishedRepo,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    type: EEmptyList.PUBLISHED_REPO,
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

export default PublishedRepoList;
