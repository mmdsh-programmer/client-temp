import { List, ListItem, Spinner } from "@material-tailwind/react";
import React, { useState } from "react";

import Error from "@components/organisms/error";
import LoadMore from "@components/molecules/loadMore";
import PublishSearchResultItem from "./publishSearchResultItem";
import useSearchPublishContent from "@hooks/publish/useSearchPublishContent";

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
  id: number;
}

const PublishSearchResult = ({ searchText, id }: IProps) => {
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
  } = useSearchPublishContent(id, searchText, 10);

  const onResultItemClick = (value: boolean) => {
    setDisableItems(value);
  };

  if (isError) {
    return (
      <div className="w-full flex justify-center items-center max-h-72 overflow-auto">
        <Error error={error} retry={refetch} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <Spinner className="h-8 w-8" color="deep-purple" />
      </div>
    );
  }

  const total = searchData?.pages[0].total;

  return (
    <List className="list w-full max-h-72 overflow-auto">
      {total ? (
        searchData?.pages.map((page, pageIndex) => {
          return page.list.map((searchResult) => {
            return (
              <PublishSearchResultItem
                resultItem={searchResult}
                disabled={disableItems}
                setDisableItems={onResultItemClick}
                // eslint-disable-next-line react/no-array-index-key
                key={`searchItem-${pageIndex}-${searchResult.versionId}`}
              />
            );
          });
        })
      ) : (
        <ListItem className="block min-h-12 gap-2 text-right text-ellipsis overflow-hidden whitespace-nowrap">
          موردی برای نمایش وجود ندارد
        </ListItem>
      )}

      {hasNextPage ? (
        <LoadMore
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      ) : null}
    </List>
  );
};

export default PublishSearchResult;
