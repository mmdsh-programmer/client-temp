import React from "react";
import EmptyList from "@components/molecules/emptyList";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import RepoPublishCardMode from "@components/molecules/repoPublishCardMode";
import { Spinner } from "@components/ui/spinner";
import { IRepoView } from "@interface/repo.interface";

const PublishCardView = ({
  isLoading,
  getRepoList,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  type,
}: IRepoView) => {
  const listLength = getRepoList?.pages[0].total;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="size-8 text-primary" />
        </div>
      );
    }
    if (listLength) {
      return (
        <>
          <div className="mx-auto grid max-w-[1200px] auto-rows-[min-content] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
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
          <RenderIf isTrue={hasNextPage}>
            <LoadMore
              className="mt-4"
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          </RenderIf>
        </>
      );
    }
    return <EmptyList type={type} />;
  };

  return <div className="publish-card-view mt-4 pb-4">{renderContent()}</div>;
};

export default PublishCardView;
