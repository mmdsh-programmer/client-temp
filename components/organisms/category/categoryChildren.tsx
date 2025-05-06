import React, { useEffect, useMemo } from "react";
import { categoryQueryParamsAtom, categoryShowAtom } from "@atom/category";
import { filterChildrenAtom, filterReportAtom } from "@atom/filter";

import ChildrenTree from "../childrenTree";
import { EEmptyList } from "@components/molecules/emptyList";
import { ICategoryView } from "@interface/category.interface";
import MobileView from "../categoryView/categoryMobileView";
import RenderIf from "@components/atoms/renderIf";
import TableView from "../categoryView/categoryTableView";
import { categoryListModeAtom } from "@atom/app";
import { repoAtom } from "@atom/repository";
import { sortAtom } from "@atom/sortParam";
import useGetCategoryChildren from "@hooks/category/useGetCategorychildren";
import useGetUser from "@hooks/auth/useGetUser";
import useGetUserDocuments from "@hooks/document/useGetUserDocuments";
import { usePathname } from "next/navigation";
import { useRecoilValue } from "recoil";

const CategoryChildren = () => {
  const getListMode = useRecoilValue(categoryListModeAtom);
  const getRepo = useRecoilValue(repoAtom);
  const getSortParams = useRecoilValue(sortAtom);
  const getCategoryShow = useRecoilValue(categoryShowAtom);
  const queryParams = useRecoilValue(categoryQueryParamsAtom);
  const getFilterChildren = useRecoilValue(filterChildrenAtom);
  const getFilterReport = useRecoilValue(filterReportAtom);
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();

  const repoId = useMemo(() => {
    if (currentPath === "/admin/myDocuments") {
      return userInfo!.repository.id;
    }
    return getRepo!.id;
  }, [currentPath, userInfo, getRepo]);

  const {
    data: childrenData,
    hasNextPage: childrenHasNextPage,
    fetchNextPage: childrenFetchNextPage,
    isFetchingNextPage: childrenIsFetchingNextPage,
    isLoading: childrenIsLoading,
    isFetching: childrenIsFetching,
    refetch: refetchChildren,
  } = useGetCategoryChildren(
    repoId,
    getCategoryShow?.id,
    getSortParams,
    queryParams.limit,
    getFilterChildren?.title,
    undefined,
    getFilterChildren,
    false,
    !!repoId && !getFilterReport,
    currentPath
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
    repoId,
    getSortParams,
    queryParams.limit,
    getFilterReport,
    null,
    !!repoId && !!getFilterReport && !getFilterChildren
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
        <div className="category-children__tree bg-white min-h-[calc(100vh-340px)] h-full">
        <ChildrenTree move={false} enableAction />
        </div>
      </RenderIf>
    </>
  );
};

export default CategoryChildren;
