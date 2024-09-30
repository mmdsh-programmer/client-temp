import EmptyList, { EEmptyList } from "@components/molecules/emptyList";

import { FaDateFromTimestamp } from "@utils/index";
import { IRepo } from "@interface/repo.interface";
import { IRepoView } from "../repoList";
import { InfiniteData } from "@tanstack/react-query";
import LoadMore from "@components/molecules/loadMore";
import MobileCard from "@components/molecules/mobileCard";
import React from "react";
import RenderIf from "@components/atoms/renderIf";
import RepoMenu from "@components/molecules/repoMenu";
import { Spinner } from "@material-tailwind/react";

interface IListResponse<T> {
  total: number;
  list: T[];
}

const renderContent = (
  isLoading: boolean,
  listLength: number,
  list: InfiniteData<IListResponse<IRepo>> | undefined,
  type: string
) => {
  if (isLoading) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      );
    } if (listLength) {
      return list?.pages.map((page) => {
        return page.list.map((repo) => {
          return (
            <MobileCard
              key={repo.id}
              name={repo.name}
              createDate={
                repo.createDate
                  ? FaDateFromTimestamp(+new Date(repo.createDate))
                  : "--"
              }
              creator={repo.owner?.userName}
              cardAction={<RepoMenu repo={repo} />}
            />
          );
        });
      });
    } 
    return <EmptyList type={type as EEmptyList} />;
  
};

const MobileView = ({
  isLoading,
  getRepoList,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  type,
}: IRepoView) => {
  const listLength = getRepoList?.pages[0].total ?? 0;
  return (
    <>
      {renderContent(isLoading, listLength, getRepoList, type)}
      <RenderIf isTrue={!!hasNextPage}>
        <div className="m-auto">
          <LoadMore
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        </div>
      </RenderIf>
    </>
  );
};

export default MobileView;
