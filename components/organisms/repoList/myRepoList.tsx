import React from "react";
import useGetMyRepoList from "@hooks/repository/useGetMyRepoList";
import RenderIf from "@components/atoms/renderIf";
import { EListMode } from "@interface/enums";
import { useRecoilValue } from "recoil";
import { listMode } from "@atom/app";
import { EEmptyList } from "@components/molecules/emptyList";
import { IRepoView } from ".";
import TableView from "../repoView/tableView";
import MobileView from "../repoView/mobileView";
import CardView from "../repoView/cardView";

interface IProps {
  archived: boolean;
}

const MyRepoList = ({ archived }: IProps) => {
  const mode = useRecoilValue(listMode);
  const {
    data: getMyRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useGetMyRepoList(20, archived, undefined, true);

  const commonProps: IRepoView = {
    isLoading,
    getRepoList: getMyRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    type: archived ? EEmptyList.ARCHIVE_REPO : EEmptyList.MY_REPO,
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

export default MyRepoList;
