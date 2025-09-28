import React, { useState } from "react";
import { List, ListItem } from "@material-tailwind/react";
import Error from "@components/organisms/error";
import LoadMore from "@components/molecules/loadMore";
import PublishSearchResultItem from "./publishContentSearchResultItem";
import useSearchPublishContent from "@hooks/publish/useSearchPublishContent";
import { Spinner } from "@components/atoms/spinner";
import useGetDomainDocuments from "@hooks/domain/useGetDomainDocuments";
import PublishAdvancedSearchResultItem from "./publishAdvancedSearchResultItem";

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
  tags: number[];
}

const PublishAdvancedSearchResult = ({ searchText, tags }: IProps) => {
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
  } = useGetDomainDocuments(searchText, tags, 20);

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
      <div className="flex w-full items-center justify-center">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  const total = searchData?.pages[0].total;

  return (
    <List
      {...({} as React.ComponentProps<typeof List>)}
      className="list max-h-72 w-full overflow-auto"
    >
      {total ? (
        searchData?.pages.map((page) => {
          return page.list.map((searchResult) => {
            return (
              <PublishAdvancedSearchResultItem
                resultItem={searchResult}
                disabled={disableItems}
                setDisableItems={onResultItemClick}
                key={`searchItem-${searchResult.id}`}
              />
            );
          });
        })
      ) : (
        <ListItem
          {...({} as React.ComponentProps<typeof ListItem>)}
          className="block min-h-12 gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-right"
        >
          موردی برای نمایش وجود ندارد
        </ListItem>
      )}
      {hasNextPage ? (
        <LoadMore fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage} />
      ) : null}
    </List>
  );
};

export default PublishAdvancedSearchResult;
