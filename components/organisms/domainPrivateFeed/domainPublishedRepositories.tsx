import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { Spinner } from "@components/atoms/spinner";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import useGetDomainPublishRepoList from "@hooks/domain/useGetDomainPublishRepoList";
import RepoDefaultImage from "@components/molecules/repoDefaultImage";
import { Card, Typography } from "@material-tailwind/react";
import { useRecoilState } from "recoil";
import { repoFeedAtom } from "@atom/feed";
import RepoFeedList from "./repoFeedList";

const DomainPublishedRepositories = () => {
  const [getRepoFeed, setRepoFeed] = useRecoilState(repoFeedAtom);
  const {
    data: publishRepoList,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetDomainPublishRepoList(30);

  const listLength = publishRepoList?.pages[0].total;

  const renderContent = () => {
    if (getRepoFeed) {
      return <RepoFeedList />;
    }
    if (isLoading) {
      return (
        <div className="flex !h-full w-full items-center justify-center">
          <Spinner className="h-8 w-8 text-primary" />
        </div>
      );
    }
    if (listLength) {
      return (
        <div className="h-full overflow-auto">
          <div className="mx-auto grid max-w-[1200px] auto-rows-[min-content] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            {publishRepoList?.pages.map((page) => {
              return page.list.map((repo) => {
                return (
                  <div key={repo.id} className="aspect-square">
                    <Card
                      placeholder="card"
                      key={`repo-card-item-${repo.id}`}
                      className="repo-publish-card h-full flex-col rounded-lg border-[1px] border-normal bg-white shadow-small last:flex"
                    >
                      <div
                        className="flex h-full w-full cursor-pointer flex-col items-center justify-between rounded-md"
                        onClick={() => {
                          return setRepoFeed({ label: repo.name, value: repo.id });
                        }}
                      >
                        <div className="default-repo-image relative flex h-40 w-full flex-1 items-center justify-center rounded-t-md bg-primary-normal">
                          <RepoDefaultImage
                            className="!h-32 !w-32"
                            imageHash={repo.imageFileHash}
                          />
                        </div>
                        <Typography className="title_t2 w-full truncate pb-8 pt-4 text-center font-[450] sm:w-[70px] md:w-[30px] lg:w-full">
                          {repo.name}
                        </Typography>
                      </div>
                    </Card>
                  </div>
                );
              });
            })}
          </div>
          <RenderIf isTrue={!!hasNextPage}>
            <div className="flex w-full justify-center">
              <LoadMore isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
            </div>
          </RenderIf>
        </div>
      );
    }
    return <EmptyList type={EEmptyList.PUBLISHED_REPO} />;
  };

  return <div className="mt-4 h-full pb-4">{renderContent()}</div>;
};

export default DomainPublishedRepositories;
