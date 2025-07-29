import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import FeedItem from "./feedItem";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@components/atoms/spinner";
import { Button, Typography } from "@material-tailwind/react";
import { BackIcon } from "@components/atoms/icons";
import useGetFollowinfRepoFeeds from "@hooks/feeds/useGetFollowinfRepoFeeds";

interface IProps {
  ssoId: number;
  repo: { label: string; value: number };
  setRepo: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: number;
    } | null>
  >;
}

const PrivateFeedList = ({ ssoId, repo, setRepo }: IProps) => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetFollowinfRepoFeeds(
    ssoId,
    repo.value,
    30,
  );

  const feedList = data?.pages[0].list;

  if (isLoading) {
    return (
      <div className="mt-6 grid h-[calc(100vh-250px)] place-content-center py-4">
        <div className="flex w-full justify-center">
          <Spinner className="h-6 w-6 text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button
          placeholder="button"
          className="h-5 w-5 bg-transparent p-0"
          onClick={() => {
            return setRepo(null);
          }}
        >
          <BackIcon className="h-4 w-4 fill-icon-hover" />
        </Button>
        <Typography className="caption_c1 lowercase text-primary_normal">{repo?.label}</Typography>
      </div>
      {feedList?.length ? (
        <div className="mt-5 flex h-[calc(100vh-360px)] flex-col gap-2 overflow-y-auto px-5">
          {feedList.map((feed) => {
            return <FeedItem key={feed.id} feed={feed} />;
          })}
          <RenderIf isTrue={!!hasNextPage}>
            <div className="mx-auto">
              <LoadMore isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
            </div>
          </RenderIf>
        </div>
      ) : (
            <EmptyList type={EEmptyList.FEED_LIST} />
      )}
    </div>
  );
};

export default PrivateFeedList;
