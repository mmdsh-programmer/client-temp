import React from "react";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import useGetUserDocuments from "@hooks/document/useGetUserDocuments";
import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import { IListResponse } from "@interface/repo.interface";
import { EEmptyList } from "@components/molecules/emptyList";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import { sort } from "@atom/sortParam";
import { categoryQueryParams, categoryShow } from "@atom/category";
import { filterChildren, filterReport } from "@atom/filter";
import MobileView from "../categoryView/categoryMobileView";
import TableView from "../categoryView/categoryTableView";
import useGetCategoryChildren from "@hooks/category/useGetCategoryChildren";

export interface ICategoryView {
  isLoading: boolean;
  getCategoryList:
    | InfiniteData<
        IListResponse<ICategoryMetadata | IDocumentMetadata>,
        unknown
      >
    | undefined;
  hasNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<
        IListResponse<ICategoryMetadata | IDocumentMetadata>,
        unknown
      >,
      Error
    >
  >;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  type: EEmptyList;
}

const CategoryChildren = () => {
  const getRepo = useRecoilValue(repoAtom);
  const getSortParams = useRecoilValue(sort);
  const getCategoryShow = useRecoilValue(categoryShow);
  const queryParams = useRecoilValue(categoryQueryParams);
  const getFilterChildren = useRecoilValue(filterChildren);
  const getFilterReport = useRecoilValue(filterReport);

  const repoId = getRepo?.id!;

  const {
    data: childrenData,
    hasNextPage: childrenHasNextPage,
    fetchNextPage: childrenFetchNextPage,
    isFetchingNextPage: childrenIsFetchingNextPage,
    isLoading: childrenIsLoading,
    refetch: childrenRefetch,
    isFetching: childrenIsFetching,
  } = useGetCategoryChildren(
    repoId,
    getCategoryShow?.id,
    getSortParams,
    queryParams.limit,
    getFilterChildren?.title,
    undefined,
    getFilterChildren,
    false,
    !getFilterReport
  );

  const {
    data: reportData,
    hasNextPage: reportHasNextPage,
    fetchNextPage: reportFetchNextPage,
    isFetchingNextPage: reportIsFetchingNextPage,
    isLoading: reportIsLoading,
    refetch: reportRefetch,
    isFetching: reportIsFetching,
  } = useGetUserDocuments(
    repoId,
    getSortParams,
    queryParams.limit,
    getFilterReport,
    !!getFilterReport && !getFilterChildren,
  );

  const commonProps: ICategoryView = {
    isLoading: reportIsLoading || childrenIsLoading,
    getCategoryList: getFilterReport ? reportData : childrenData,
    hasNextPage: getFilterReport ? reportHasNextPage : childrenHasNextPage,
    fetchNextPage: getFilterReport ? reportFetchNextPage : childrenFetchNextPage,
    isFetchingNextPage: getFilterReport ? reportIsFetchingNextPage : childrenIsFetchingNextPage,
    isFetching: getFilterReport ? reportIsFetching : childrenIsFetching,
    type:
      getFilterChildren?.title || !!getFilterReport
        ? EEmptyList.FILTER
        : EEmptyList.CHILDREN,
  };

  return (
    <>
      <div className="hidden xs:block">
        <TableView {...commonProps} />
      </div>
      <div className="block xs:hidden">
        <MobileView {...commonProps} />
      </div>
    </>
  );
};

export default CategoryChildren;
