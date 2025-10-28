import React, { useEffect, useState } from "react";
import { List, ListItem, Typography } from "@material-tailwind/react";
import Error from "@components/organisms/error";
import LoadMore from "@components/molecules/loadMore";
import { Spinner } from "@components/atoms/spinner";
import useGetDomainDocuments from "@hooks/domain/useGetDomainDocuments";
import PublishAdvancedSearchResultItem from "./publishAdvancedSearchResultItem";
import useGetDomainVersions from "@hooks/domain/useGetDomainVersions";
import { useParams } from "next/navigation";
import { toEnglishDigit } from "@utils/index";
import PublishAdvancedSearchVersionItem from "./publishAdvancedSearchVersionItem";
import { ISearchSortParams } from "./publishAdvancedSearch";

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
  creatorName?: string;
  sortParams: ISearchSortParams;
}

const PublishAdvancedSearchResult = ({ searchText, tags, creatorName, sortParams }: IProps) => {
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
  } = useGetDomainDocuments(searchText, tags, creatorName, sortParams, 20);

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
    creatorName,
    sortParams,
    undefined,
    undefined,
    undefined,
    20,
  );

  const onResultItemClick = (value: boolean) => {
    setDisableItems(value);
  };

  useEffect(() => {
    domainDocumentsRefetch();
    domainVersionsRefetch();
  }, [searchText, creatorName, sortParams]);

  const documentLength = domainDocuments?.pages[0].total;
  const versionLength = domainVersions?.pages[0].total;

  if (domainDocumentsIsError || domainVersionsIsError) {
    return (
      <div className="flex max-h-72 w-full items-center justify-center overflow-auto">
        <Error
          error={domainDocumentsError! || domainVersionsError!}
          retry={domainDocumentsRefetch || domainVersionsRefetch}
        />
      </div>
    );
  }

  if (domainDocumentsIsLoading || domainVersionsIsLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex max-h-[150px] flex-col gap-4">
        <Typography
          className="title_t2 text-primary_normal"
          placeholder=""
          {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
        >
          جستجو در لیست سندها
        </Typography>
        <List
          {...({} as React.ComponentProps<typeof List>)}
          className="list !overflow-x-hiddeد w-full overflow-y-auto"
        >
          {documentLength ? (
            domainDocuments?.pages.map((page) => {
              return page.list.map((searchResult) => {
                return (
                  <PublishAdvancedSearchResultItem
                    resultItem={searchResult}
                    disabled={disableItems}
                    setDisableItems={onResultItemClick}
                    key={`documentItem-${searchResult.id}`}
                  />
                );
              });
            })
          ) : (
            <ListItem
              {...({} as React.ComponentProps<typeof ListItem>)}
              className="title_t2 block min-h-12 gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-right"
            >
              موردی برای نمایش وجود ندارد
            </ListItem>
          )}
          {domainDocumentsHasNextPage ? (
            <LoadMore
              fetchNextPage={domainDocumentsFetchNextPage}
              isFetchingNextPage={domainDocumentsIsFetchingNextPage}
            />
          ) : null}
        </List>
      </div>
      <div className="flex max-h-[150px] flex-col gap-2">
        <Typography
          className="title_t2 text-primary_normal"
          placeholder=""
          {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
        >
          جستجو در لیست نسخه‌ها
        </Typography>
        <List
          {...({} as React.ComponentProps<typeof List>)}
          className="list w-full overflow-y-auto !overflow-x-hidden"
        >
          {versionLength ? (
            domainVersions?.pages.map((page) => {
              return page.list.map((searchResult) => {
                return (
                  <PublishAdvancedSearchVersionItem
                    resultItem={searchResult}
                    disabled={disableItems}
                    setDisableItems={onResultItemClick}
                    key={`versionItem-${searchResult.id}`}
                  />
                );
              });
            })
          ) : (
            <ListItem
              {...({} as React.ComponentProps<typeof ListItem>)}
              className="title_t2 block min-h-12 gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-right"
            >
              موردی برای نمایش وجود ندارد
            </ListItem>
          )}
          {domainVersionsHasNextPage ? (
            <LoadMore
              fetchNextPage={domainVersionsFetchNextPage}
              isFetchingNextPage={domainVersionsIsFetchingNextPage}
            />
          ) : null}
        </List>
      </div>
    </div>
  );
};

export default PublishAdvancedSearchResult;
