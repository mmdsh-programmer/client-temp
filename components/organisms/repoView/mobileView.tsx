import React from "react";
import { Spinner } from "@material-tailwind/react";
import LoadMore from "@components/molecules/loadMore";
import EmptyList from "@components/molecules/emptyList";
import MobileCard from "@components/molecules/mobileCard";
import RepoMenu from "@components/molecules/repoMenu";
import { FaDateFromTimestamp } from "@utils/index";
import RenderIf from "@components/atoms/renderIf";
import { IRepoView } from "@interface/repo.interface";

const MobileView = ({
  isLoading,
  getRepoList,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  type,
}: IRepoView) => {
  const listLength = getRepoList?.pages[0].total;
  return (
    <>
       {/* eslint-disable-next-line no-nested-ternary */}
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      ) : listLength ? (
        getRepoList?.pages.map((page) => {
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
        })
      ) : (
        <EmptyList type={type} />
      )}
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
