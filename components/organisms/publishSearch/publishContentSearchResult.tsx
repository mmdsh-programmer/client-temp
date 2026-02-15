"use client";

import React, { useState } from "react";
import Error from "@components/organisms/error";
import LoadMore from "@components/molecules/loadMore";
import useSearchPublishContent from "@hooks/publish/useSearchPublishContent";
import PublishSearchResultItem from "@components/organisms/publishSearch/publishContentSearchResultItem";
import { Spinner } from "@components/ui/spinner";
import { cn } from "@utils/cn";

export interface ISearchResultItem {
  versionId: number;
  versionName: string;
  documentId: number;
  documentName: string;
  repoId: number;
  repoName: string;
  contentId: number;
}

interface IProps {
  searchText: string;
  id?: number;
}

const PublishContentSearchResult = ({ searchText, id }: IProps) => {
  const [disableItems, setDisableItems] = useState(false);
  const {
    data: searchData,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error,
    refetch,
  } = useSearchPublishContent(id, searchText, 20);

  const onResultItemClick = (value: boolean) => {
    setDisableItems(value);
  };

  if (isError) {
    return (
      <div className="flex max-h-72 w-full items-center justify-center overflow-auto">
        <Error error={error} retry={refetch} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center py-4">
        <Spinner className="size-8 text-primary" />
      </div>
    );
  }

  const total = searchData?.pages[0].total;

  return (
    <div
      className={cn(
        "flex w-full flex-col max-h-72 overflow-auto rounded-md p-0",
        "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent" // Optional: nice scrollbar styling if needed
      )}
    >
      {total ? (
        searchData?.pages.map((page, pageIndex) => {
          return page.list.map((searchResult) => {
            return (
              <PublishSearchResultItem
                resultItem={searchResult}
                disabled={disableItems}
                setDisableItems={onResultItemClick}
                key={`searchItem-${pageIndex}-${searchResult.versionId}`}
              />
            );
          });
        })
      ) : (
        <div
          className={cn(
            "flex w-full min-h-12 items-center gap-2 px-3 py-2",
            "overflow-hidden text-ellipsis whitespace-nowrap",
            "text-right text-sm text-muted-foreground"
          )}
        >
          موردی برای نمایش وجود ندارد
        </div>
      )}

      {hasNextPage ? (
        <LoadMore
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      ) : null}
    </div>
  );
};

export default PublishContentSearchResult;