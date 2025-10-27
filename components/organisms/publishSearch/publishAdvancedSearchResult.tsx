import React, { useState } from "react";
import { List, ListItem } from "@material-tailwind/react";
import Error from "@components/organisms/error";
import LoadMore from "@components/molecules/loadMore";
import PublishSearchResultItem from "./publishContentSearchResultItem";
import useSearchPublishContent from "@hooks/publish/useSearchPublishContent";
import { Spinner } from "@components/atoms/spinner";
import useGetDomainDocuments from "@hooks/domain/useGetDomainDocuments";
import PublishAdvancedSearchResultItem from "./publishAdvancedSearchResultItem";
import useGetDomainVersions from "@hooks/domain/useGetDomainVersions";
import { useParams } from "next/navigation";
import { toEnglishDigit } from "@utils/index";

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

  const params = useParams();
  const idParam = params?.id;
  const repoId = toEnglishDigit(
    decodeURIComponent(Array.isArray(idParam) ? idParam[0] : (idParam ?? "")),
  );

  const {
    data: domainDocuments,
    isLoading: domainDocumentsIsLoading,
    hasNextPage: domainDocumentsHasNextPage,
    fetchNextPage: domainDocumentsFetchNextPage,
    isFetchingNextPage: domainDocumentsIsFetchingNextPage,
    isError: domainDocumentsIsError,
    error: domainDocumentsError,
    refetch: domainDocumentsRefetch,
  } = useGetDomainDocuments(searchText, tags, undefined, 20);

  const {
    data: domainVersions,
    isLoading: domainVersionsIsLoading,
    hasNextPage: domainVersionsHasNextPage,
    fetchNextPage: domainVersionsFetchNextPage,
    isFetchingNextPage: domainVersionsIsFetchingNextPage,
    isError: domainVersionsIsError,
    error: domainVersionsError,
    refetch: domainVersionsRefetch,
  } = useGetDomainVersions(
    +repoId || undefined,
    undefined,
    searchText,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    20,
  );

  const onResultItemClick = (value: boolean) => {
    setDisableItems(value);
  };

  if (domainDocumentsIsError || domainVersionsIsError) {
    return (
      <div className="flex max-h-72 w-full items-center justify-center overflow-auto">
        <Error
          error={domainDocumentsError! || domainVersionsError!}
          retry={domainDocumentsRefetch}
        />
      </div>
    );
  }

  if (domainVersionsIsLoading || domainDocumentsIsLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  const total = domainDocuments?.pages[0].total;

  return (
    <List
      {...({} as React.ComponentProps<typeof List>)}
      className="list max-h-72 w-full overflow-auto"
    >
      {total ? (
        domainDocuments?.pages.map((page) => {
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
      {/* {hasNextPage ? (
        <LoadMore fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage} />
      ) : null} */}
    </List>
  );
};

export default PublishAdvancedSearchResult;
