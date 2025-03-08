"use client";

import React from "react";
import useGetPublicFeeds from "@hooks/feeds/useGetPublicFeeds";
import { Spinner } from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import RenderIf from "@components/atoms/renderIf";
import LoadMore from "@components/molecules/loadMore";
import FeedItem from "./feedItem";

const PublicFeedList = () => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetPublicFeeds(10, true);

  const feedList = data?.pages.flatMap((page) => {
    return page.list;
  });

  if (isLoading) {
    return (
      <div className="mt-6 grid h-[calc(100vh-250px)] place-content-center py-4">
        <div className="w-full flex justify-center">
          <Spinner className="h-6 w-6" color="deep-purple" />
        </div>
      </div>
    );
  }

  if (!feedList?.length) {
    return (
      <div className="mt-6 grid h-[calc(100vh-250px)] place-content-center py-4">
        <EmptyList type={EEmptyList.FEED_LIST} />
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="flex flex-col gap-2 h-[calc(100vh-250px)] overflow-y-auto p-5">
        {feedList.map((feed) => {
          return <FeedItem key={feed.id} feed={feed} />;
        })}
        <RenderIf isTrue={!!hasNextPage}>
          <div className="mx-auto">
            <LoadMore
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          </div>
        </RenderIf>
      </div>
    </div>
  );
};

export default PublicFeedList;
