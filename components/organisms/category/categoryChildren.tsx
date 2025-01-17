import React, { useMemo } from "react";
import { categoryQueryParamsAtom, categoryShowAtom } from "@atom/category";
import { filterChildrenAtom, filterReportAtom } from "@atom/filter";
import { EEmptyList } from "@components/molecules/emptyList";
import { ICategoryView } from "@interface/category.interface";
import MobileView from "../categoryView/categoryMobileView";
import TableView from "../categoryView/categoryTableView";
import { repoAtom } from "@atom/repository";
import { sortAtom } from "@atom/sortParam";
import useGetCategoryChildren from "@hooks/category/useGetCategorychildren";
import useGetUserDocuments from "@hooks/document/useGetUserDocuments";
import { useRecoilValue } from "recoil";
import { usePathname } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";
import { categoryListModeAtom } from "@atom/app";
import RenderIf from "@components/atoms/renderIf";
import ChildrenTree from "../childrenTree";

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
      return userInfo?.repository?.id;
    }
    return getRepo?.id;
  }, [currentPath, userInfo, getRepo]);

  const {
    data: childrenData,
    hasNextPage: childrenHasNextPage,
    fetchNextPage: childrenFetchNextPage,
    isFetchingNextPage: childrenIsFetchingNextPage,
    isLoading: childrenIsLoading,
    isFetching: childrenIsFetching,
  } = useGetCategoryChildren(
    repoId ?? 0,
    getCategoryShow?.id,
    getSortParams,
    queryParams.limit,
    getFilterChildren?.title,
    undefined,
    getFilterChildren,
    false,
    !!repoId && !getFilterReport
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
    null,
    !!repoId && !!getFilterReport && !getFilterChildren
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
      <RenderIf isTrue={getListMode === "table"}>
        <>
          <div className="category-children hidden xs:block">
            <TableView {...commonProps} />
          </div>
          <div className="block xs:hidden">
            <MobileView {...commonProps} />
          </div>
        </>
      </RenderIf>
      <RenderIf isTrue={getListMode === "tree"}>
        <div className="bg-white">

        <ChildrenTree enableAction />
        </div>
      </RenderIf>
    </>
  );
};

export default CategoryChildren;
