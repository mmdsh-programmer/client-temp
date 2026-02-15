import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@components/ui/spinner";
import { cn } from "@/utils/cn";
import Error from "@components/organisms/error";
import useGetDomainVersions from "@hooks/domain/useGetDomainVersions";
import useGetDomainDocuments from "@hooks/domain/useGetDomainDocuments";
import PublishAdvancedSearchResultItem from "@components/organisms/publishSearch/publishAdvancedSearchResultItem";
import PublishAdvancedSearchVersionItem from "@components/organisms/publishSearch/publishAdvancedSearchVersionItem";
import DomainDocumentsLoadMore from "@components/organisms/publishSearch/domainDocumentsLoadMore";
import DomainVersionsLoadMore from "@components/organisms/publishSearch/domainVersionsLoadMore";
import { ISearchSortParams } from "@components/organisms/publishSearch/publishAdvancedSearch";
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
  creatorName?: string;
  sortParams: ISearchSortParams;
}

const listItemEmptyClassName =
  "label flex min-h-8 items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap px-2 text-right";

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
  } = useGetDomainDocuments(+repoId, searchText, tags, creatorName, sortParams, 3);

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
  }, [searchText, creatorName, sortParams, domainDocumentsRefetch, domainVersionsRefetch]);

  const documentLength = domainDocuments?.pages[0].total;
  const versionLength = domainVersions?.pages[0].total;

  if (domainDocumentsIsError || domainVersionsIsError) {
    return (
      <div className="flex max-h-72 w-full items-center justify-center overflow-auto">
        <Error
          error={domainDocumentsError ?? domainVersionsError!}
          retry={domainDocumentsRefetch ?? domainVersionsRefetch}
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
        <h2 className={cn("title_t2 text-primary_normal")}>نتایج در لیست سندها</h2>
        <ul className={cn("list flex w-full items-center overflow-hidden")} role="list">
          {documentLength ? (
            domainDocuments?.pages.map((page) => {
              return page.list.map((searchResult, index) => {
                return index < 2 ? (
                  <li key={`documentItem-${searchResult.id}`}>
                    <PublishAdvancedSearchResultItem
                      resultItem={searchResult}
                      disabled={disableItems}
                      setDisableItems={onResultItemClick}
                    />
                  </li>
                ) : null;
              });
            })
          ) : (
            <li className={cn(listItemEmptyClassName)}>موردی برای نمایش وجود ندارد</li>
          )}
          {domainDocumentsHasNextPage ? (
            <li className="list-none">
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  "label h-auto cursor-pointer self-end bg-transparent px-0 py-1 text-[11px] text-[#0369CD]",
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setDocumentsLoadMore(true);
                }}
              >
                نمایش بیشتر
              </Button>
            </li>
          ) : null}
        </ul>
      </div>
      <div className="flex max-h-[150px] flex-col gap-2">
        <h2 className={cn("title_t2 text-primary_normal")}>نتایج در لیست نسخه‌ها</h2>
        <ul className={cn("list w-full overflow-hidden")} role="list">
          {versionLength ? (
            domainVersions?.pages.map((page) => {
              return page.list.map((searchResult, index) => {
                return index < 2 ? (
                  <li key={`versionItem-${searchResult.id}`}>
                    <PublishAdvancedSearchVersionItem
                      resultItem={searchResult}
                      disabled={disableItems}
                      setDisableItems={onResultItemClick}
                    />
                  </li>
                ) : null;
              });
            })
          ) : (
            <li className={cn(listItemEmptyClassName)}>موردی برای نمایش وجود ندارد</li>
          )}
          {domainVersionsHasNextPage ? (
            <li className="list-none">
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  "label h-auto cursor-pointer bg-transparent px-0 py-1 text-[11px] text-[#0369CD]",
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setVersionsLoadMore(true);
                }}
              >
                نمایش بیشتر
              </Button>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default PublishAdvancedSearchResult;
