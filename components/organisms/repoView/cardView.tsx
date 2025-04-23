import EmptyList from "@components/molecules/emptyList";
import { IRepoView } from "@interface/repo.interface";
import LoadMore from "@components/molecules/loadMore";
import React from "react";
import RenderIf from "@components/atoms/renderIf";
import RepoCardMode from "@components/molecules/repoCardMode";
import { Spinner } from "@material-tailwind/react";

const CardView = ({
  isLoading,
  getRepoList,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  type,
}: IRepoView) => {
  const listLength = getRepoList?.pages[0].total;
  return (
    <div className="min-h-[calc(100vh-340px)]">
        {/* eslint-disable-next-line no-nested-ternary */}
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner className="h-8 w-8" color="purple" />
          </div>
        ) : listLength ? (
          <>
            <div className="grid grid-cols-1 grid-rows-[min-content] gap-4 flex-wrap">
              {getRepoList?.pages.map((page) => {
                return page.list.map((repo) => {
                  return (
                    <RepoCardMode
                      key={repo.id}
                      repo={repo}
                    />
                  );
                });
              })}
            </div>
            <RenderIf isTrue={!!hasNextPage}>
              <div className="w-full flex justify-center items-center m-auto">
                <LoadMore
                  isFetchingNextPage={isFetchingNextPage}
                  fetchNextPage={fetchNextPage}
                />
              </div>
            </RenderIf>
          </>
        ) : (
          <EmptyList type={type} />
        )}
      </div>
  );
};

export default CardView;
