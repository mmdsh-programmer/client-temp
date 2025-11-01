import React, { useEffect, useState } from "react";
import { Button, List, ListItem, Typography } from "@material-tailwind/react";
import Error from "@components/organisms/error";
import { Spinner } from "@components/atoms/spinner";
import useGetDomainDocuments from "@hooks/domain/useGetDomainDocuments";
import PublishAdvancedSearchResultItem from "./publishAdvancedSearchResultItem";
import useGetDomainVersions from "@hooks/domain/useGetDomainVersions";
import { useParams } from "next/navigation";
import { toEnglishDigit } from "@utils/index";
import PublishAdvancedSearchVersionItem from "./publishAdvancedSearchVersionItem";
import { ISearchSortParams } from "./publishAdvancedSearch";
import DomainDocumentsLoadMore from "./domainDocumentsLoadMore";
import DomainVersionsLoadMore from "./domainVersionsLoadMore";

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
  const [documentsLoadMore, setDocumentsLoadMore] = useState(false);
  const [versionsLoadMore, setVersionsLoadMore] = useState(false);

  const params = useParams();
  const idParam = params?.id;
  const repoId = toEnglishDigit(
    decodeURIComponent(Array.isArray(idParam) ? idParam[0] : (idParam ?? "")),
  );

  const {
    data: domainDocuments,
    isLoading: domainDocumentsIsLoading,
    hasNextPage: domainDocumentsHasNextPage,
    isError: domainDocumentsIsError,
    error: domainDocumentsError,
    refetch: domainDocumentsRefetch,
  } = useGetDomainDocuments(searchText, tags, creatorName, sortParams, 3);

  const {
    data: domainVersions,
    isLoading: domainVersionsIsLoading,
    hasNextPage: domainVersionsHasNextPage,
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
    3,
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

  if (versionsLoadMore) {
    return (
      <DomainVersionsLoadMore
        searchText={searchText}
        creatorName={creatorName}
        sortParams={sortParams}
        handleBack={() => {
          setVersionsLoadMore(false);
        }}
      />
    );
  }

  if (documentsLoadMore) {
    return (
      <DomainDocumentsLoadMore
        searchText={searchText}
        tags={tags}
        creatorName={creatorName}
        sortParams={sortParams}
        handleBack={() => {
          setDocumentsLoadMore(false);
        }}
      />
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex max-h-[150px] flex-col gap-4">
        <Typography
          className="title_t2 text-primary_normal"
          placeholder=""
          {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
        >
          نتایج در لیست سندها
        </Typography>
        <List
          {...({} as React.ComponentProps<typeof List>)}
          className="list flex w-full !overflow-hidden"
        >
          {documentLength ? (
            domainDocuments?.pages.map((page) => {
              return page.list.map((searchResult, index) => {
                return index < 2 ? (
                  <PublishAdvancedSearchResultItem
                    resultItem={searchResult}
                    disabled={disableItems}
                    setDisableItems={onResultItemClick}
                    key={`documentItem-${searchResult.id}`}
                  />
                ) : null;
              });
            })
          ) : (
            <ListItem
              {...({} as React.ComponentProps<typeof ListItem>)}
              className="label flex min-h-8 items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap !px-2 text-right"
            >
              موردی برای نمایش وجود ندارد
            </ListItem>
          )}
          {domainDocumentsHasNextPage ? (
            <Button
              className="label cursor-pointer self-end bg-transparent !p-0 !text-[11px] text-[#0369CD]"
              onClick={(e) => {
                e.stopPropagation();
                setDocumentsLoadMore(true);
              }}
              {...({} as React.ComponentProps<typeof Button>)}
            >
              نمایش بیشتر
            </Button>
          ) : null}
        </List>
      </div>
      <div className="flex max-h-[150px] flex-col gap-2">
        <Typography
          className="title_t2 text-primary_normal"
          placeholder=""
          {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
        >
          نتایج در لیست نسخه‌ها
        </Typography>
        <List
          {...({} as React.ComponentProps<typeof List>)}
          className="list w-full !overflow-hidden"
        >
          {versionLength ? (
            domainVersions?.pages.map((page) => {
              return page.list.map((searchResult, index) => {
                return index < 2 ? (
                  <PublishAdvancedSearchVersionItem
                    resultItem={searchResult}
                    disabled={disableItems}
                    setDisableItems={onResultItemClick}
                    key={`versionItem-${searchResult.id}`}
                  />
                ) : null;
              });
            })
          ) : (
            <ListItem
              {...({} as React.ComponentProps<typeof ListItem>)}
              className="label flex min-h-8 items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap !px-2 text-right"
            >
              موردی برای نمایش وجود ندارد
            </ListItem>
          )}
          {domainVersionsHasNextPage ? (
            <Button
              {...({} as React.ComponentProps<typeof Button>)}
              className="label cursor-pointer bg-transparent !p-0 !text-[11px] text-[#0369CD]"
              onClick={(e) => {
                e.stopPropagation();
                setVersionsLoadMore(true);
              }}
            >
              نمایش بیشتر
            </Button>
          ) : null}
        </List>
      </div>
    </div>
  );
};

export default PublishAdvancedSearchResult;
