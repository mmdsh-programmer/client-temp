import React from "react";
import { Spinner } from "@material-tailwind/react";
import LoadMore from "@components/molecules/loadMore";
import EmptyList from "@components/molecules/emptyList";
import RenderIf from "@components/atoms/renderIf";
import { IRepoView } from "@interface/repo.interface";
import RepoPublishCardMode from "@components/molecules/repoPublishCardMode";

const PublishCardView = ({
  isLoading,
  getRepoList,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  type,
}: IRepoView) => {
  const listLength = getRepoList?.pages[0].total;
  return (
    <div className="pb-4 mt-4">
      {/* eslint-disable-next-line no-nested-ternary */}
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      ) : listLength ? (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] auto-rows-[min-content] gap-4">
            {getRepoList?.pages.map((page) => {
              return page.list.map((repo) => {
                return (
                  <div key={repo.id} className="aspect-square">
                    <RepoPublishCardMode key={repo.id} repo={repo} />
                  </div>
                );
              });
            })}
          </div>
          <RenderIf isTrue={!!hasNextPage}>
            <div className="flex justify-center w-full">
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

export default PublishCardView;
