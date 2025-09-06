import React, { useEffect } from "react";
import { useCategoryStore } from "@store/category";
import { useFilterStore } from "@store/filter";
import ChildrenTree from "../childrenTree";
import { EEmptyList } from "@components/molecules/emptyList";
import { ICategoryView } from "@interface/category.interface";
import MobileView from "../categoryView/categoryMobileView";
import RenderIf from "@components/atoms/renderIf";
import TableView from "../categoryView/categoryTableView";
import { useAppStore } from "@store/app";
import { useSortStore } from "@store/sortParam";
import useGetCategoryChildren from "@hooks/category/useGetCategorychildren";
import useGetUserDocuments from "@hooks/document/useGetUserDocuments";
import { usePathname } from "next/navigation";
import useRepoId from "@hooks/custom/useRepoId";

const CategoryChildren = () => {
  const currentPath = usePathname();
  const repoId = useRepoId();

  const { categoryListMode: getListMode } = useAppStore();
  const { sort: getSortParams } = useSortStore();
  const { categoryShow: getCategoryShow } = useCategoryStore();
  const { categoryQueryParams: queryParams } = useCategoryStore();
  const { filterChildren: getFilterChildren } = useFilterStore();
  const { filterReport: getFilterReport } = useFilterStore();

  const {
    data: childrenData,
    hasNextPage: childrenHasNextPage,
    fetchNextPage: childrenFetchNextPage,
    isFetchingNextPage: childrenIsFetchingNextPage,
    isLoading: childrenIsLoading,
    isFetching: childrenIsFetching,
    refetch: refetchChildren,
  } = useGetCategoryChildren(
    repoId!,
    getCategoryShow?.id,
    getSortParams,
    queryParams.limit,
    getFilterChildren?.title,
    undefined,
    getFilterChildren,
    false,
    !!repoId && !getFilterReport,
    currentPath,
  );

  const {
    data: reportData,
    hasNextPage: reportHasNextPage,
    fetchNextPage: reportFetchNextPage,
    isFetchingNextPage: reportIsFetchingNextPage,
    isLoading: reportIsLoading,
    isFetching: reportIsFetching,
    refetch: refetchReport,
  } = useGetUserDocuments(
    repoId!,
    getSortParams,
    queryParams.limit,
    getFilterReport,
    null,
    !!repoId && !!getFilterReport && !getFilterChildren,
  );

  useEffect(() => {
    if (getFilterReport) {
      refetchReport();
    } else {
      refetchChildren();
    }
  }, [getSortParams, getFilterReport]);

  const commonProps: ICategoryView = {
    isLoading: reportIsLoading || childrenIsLoading,
    getCategoryList: getFilterReport ? reportData : childrenData,
    hasNextPage: getFilterReport ? reportHasNextPage : childrenHasNextPage,
    fetchNextPage: getFilterReport ? reportFetchNextPage : childrenFetchNextPage,
    isFetchingNextPage: getFilterReport ? reportIsFetchingNextPage : childrenIsFetchingNextPage,
    isFetching: getFilterReport ? reportIsFetching : childrenIsFetching,
    type: getFilterChildren?.title || !!getFilterReport ? EEmptyList.FILTER : EEmptyList.CHILDREN,
  };

  return (
    <>
      <RenderIf isTrue={getListMode === "table"}>
        <>
          <div className="category-children hidden xs:block">
            <TableView {...commonProps} />
          </div>
          <div className="category-children block xs:hidden">
            <MobileView {...commonProps} />
          </div>
        </>
      </RenderIf>
      <RenderIf isTrue={getListMode === "tree"}>
        <div className="category-children__tree h-full min-h-[calc(100vh-340px)] bg-white">
          <ChildrenTree move={false} enableAction />
        </div>
      </RenderIf>
    </>
  );
};

export default CategoryChildren;
