import React from "react";
import RenderIf from "@components/atoms/renderIf";
import useGetAccessList from "@hooks/repository/useGetAccessList";
import { EListMode } from "@interface/enums";
import { useRecoilValue } from "recoil";
import { listMode } from "@atom/app";
import { EEmptyList } from "@components/molecules/emptyList";
import { IRepoView } from ".";
import TableView from "../repoView/tableView";
import MobileView from "../repoView/mobileView";
import CardView from "../repoView/cardView";

const AccessRepoList = () => {
  const mode = useRecoilValue(listMode);
  const {
    data: getAccessRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useGetAccessList(20, undefined, true);

  const commonProps: IRepoView = {
    isLoading,
    getRepoList: getAccessRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    type: EEmptyList.ACCESS_REPO,
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

export default AccessRepoList;
