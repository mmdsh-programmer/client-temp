import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import React, { useState } from "react";

import FeedItem from "./feedItem";
import LoadMore from "@components/molecules/loadMore";
import PrivateFeedFilter from "./privateFeedFilter";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@material-tailwind/react";
import useGetPrivateFeeds from "@hooks/feeds/useGetPrivateFeeds";

interface IProps {
  ssoId: number;
}

const PrivateFeedList = ({ ssoId }: IProps) => {
  const [getFilterPrivateFeeds, setFilterPrivateFeeds] = useState<number[]>([]);
  const repoId = getFilterPrivateFeeds[0] ?? undefined;
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetPrivateFeeds(ssoId, 10, repoId);

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
      <div className="p-4">
        <div className="grid grid-cols-3 justify-end px-7">
          <div className="col-span-1 col-start-3">
            <PrivateFeedFilter
              selectedOptions={getFilterPrivateFeeds}
              setSelectedOptions={setFilterPrivateFeeds}
            />
          </div>
        </div>
        <div className="mt-6 grid h-[calc(100vh-250px)] place-content-center py-4">
          <EmptyList type={EEmptyList.FEED_LIST} />
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="grid grid-cols-3 justify-end px-7">
        <div className="col-span-1 col-start-3">
          <PrivateFeedFilter
            selectedOptions={getFilterPrivateFeeds}
            setSelectedOptions={setFilterPrivateFeeds}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 h-[calc(100vh-360px)] overflow-y-auto px-5 mt-5">
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

export default PrivateFeedList;
