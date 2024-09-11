import React from "react";
import { Spinner } from "@material-tailwind/react";
import LoadMore from "@components/molecules/loadMore";
import EmptyList from "@components/molecules/emptyList";
import RepoCardMode from "@components/molecules/repoCardMode";
import RenderIf from "@components/atoms/renderIf";
import { IRepoView } from "../repoList";
import RepoMenu from "@components/molecules/repoMenu";

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
    <>
      <div className="min-h-[calc(100vh-340px)]">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner className="h-8 w-8" color="deep-purple" />
          </div>
        ) : listLength ? (
          <>
            <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 grid-rows-[min-content] gap-4 flex-wrap">
              {getRepoList?.pages.map((page) => {
                return page.list.map((repo) => {
                  return <RepoCardMode key={repo.id} repo={repo} />;
                });
              })}
            </div>
            <RenderIf isTrue={!!hasNextPage}>
              <div className="m-auto">
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
      <RepoMenu showDrawer />
    </>
  );
};

export default CardView;
