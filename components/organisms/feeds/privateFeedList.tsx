import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import FeedItem from "./feedItem";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@components/atoms/spinner";
import useGetPrivateFeeds from "@hooks/feeds/useGetPrivateFeeds";
import { useParams } from "next/navigation";
import { toEnglishDigit } from "@utils/index";

interface IProps {
  ssoId: number;
}

const PrivateFeedList = ({ ssoId }: IProps) => {
  const params = useParams();

  const idParam = params?.id;
  const repoId = toEnglishDigit(
    decodeURIComponent(Array.isArray(idParam) ? idParam[0] : (idParam ?? "")),
  );

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetPrivateFeeds(
    ssoId,
    +repoId,
    30,
  );

  const feedList = data?.pages.flatMap((page) => {
    return page.list;
  });

  if (isLoading) {
    return (
      <div className="mt-6 grid h-[calc(100vh-250px)] place-content-center py-4">
        <div className="flex w-full justify-center">
          <Spinner className="h-6 w-6 text-primary" />
        </div>
      </div>
    );
  }

  if (!feedList?.length) {
    return (
      <div className="p-4">
        <div className="mt-6 grid h-[calc(100vh-250px)] place-content-center py-4">
          <EmptyList type={EEmptyList.FEED_LIST} />
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
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
    </div>
  );
};

export default PrivateFeedList;
