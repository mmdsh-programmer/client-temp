import React from "react";
import {
  categoryQueryParamsAtom,
  categoryShowAtom,
} from "@atom/category";
import { filterChildrenAtom, filterReportAtom } from "@atom/filter";
import { EEmptyList } from "@components/molecules/emptyList";
import MobileView from "../categoryView/categoryMobileView";
import TableView from "../categoryView/categoryTableView";
import { repoAtom } from "@atom/repository";
import { sortAtom } from "@atom/sortParam";
import useGetCategoryChildren from "@hooks/category/useGetCategorychildren";
import useGetUserDocuments from "@hooks/document/useGetUserDocuments";
import { useRecoilValue } from "recoil";
import { ICategoryView } from "@interface/category.interface";

const CategoryChildren = () => {
  const getRepo = useRecoilValue(repoAtom);
  const getSortParams = useRecoilValue(sortAtom);
  const getCategoryShow = useRecoilValue(categoryShowAtom);
  const queryParams = useRecoilValue(categoryQueryParamsAtom);
  const getFilterChildren = useRecoilValue(filterChildrenAtom);
  const getFilterReport = useRecoilValue(filterReportAtom);

  const repoId = getRepo!.id;

  const {
    data: childrenData,
    hasNextPage: childrenHasNextPage,
    fetchNextPage: childrenFetchNextPage,
    isFetchingNextPage: childrenIsFetchingNextPage,
    isLoading: childrenIsLoading,
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
    isFetching: reportIsFetching,
  } = useGetUserDocuments(
    repoId,
    getSortParams,
    queryParams.limit,
    getFilterReport,
    !!getFilterReport && !getFilterChildren
  );

  const commonProps: ICategoryView = {
    isLoading: reportIsLoading || childrenIsLoading,
    getCategoryList: getFilterReport ? reportData : childrenData,
    hasNextPage: getFilterReport ? reportHasNextPage : childrenHasNextPage,
    fetchNextPage: getFilterReport
      ? reportFetchNextPage
      : childrenFetchNextPage,
    isFetchingNextPage: getFilterReport
      ? reportIsFetchingNextPage
      : childrenIsFetchingNextPage,
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
