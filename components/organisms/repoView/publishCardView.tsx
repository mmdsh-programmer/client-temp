import EmptyList from "@components/molecules/emptyList";
import { IRepoView } from "@interface/repo.interface";
import LoadMore from "@components/molecules/loadMore";
import React from "react";
import RenderIf from "@components/atoms/renderIf";
import RepoPublishCardMode from "@components/molecules/repoPublishCardMode";
import { Spinner } from "@material-tailwind/react";

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
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="purple" />
        </div>
      );
    }
    if (listLength) {
      return (
        <>
          <div className="grid max-w-[1200px] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] auto-rows-[min-content] gap-4 mx-auto">
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
      );
    }
    return <EmptyList type={type} />;
  };

  return <div className="publish-card-view pb-4 mt-4">{renderContent()}</div>;
};

export default PublishCardView;
