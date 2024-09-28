import React from "react";
import CardView from "../repoView/cardView";
import { EEmptyList } from "@components/molecules/emptyList";
import { EListMode } from "@interface/enums";
import { IRepoView } from ".";
import MobileView from "../repoView/mobileView";
import RenderIf from "@components/atoms/renderIf";
import TableView from "../repoView/tableView";
import { listModeAtom } from "@atom/app";
import useGetMyRepoList from "@hooks/repository/useGetMyRepoList";
import { useRecoilValue } from "recoil";

interface IProps {
  archived: boolean;
}

const MyRepoList = ({ archived }: IProps) => {
  const mode = useRecoilValue(listModeAtom);
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
