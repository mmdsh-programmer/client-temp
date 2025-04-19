import { Button, Typography } from "@material-tailwind/react";
import { ETourSection, activeTourAtom } from "@atom/tour";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { EEmptyList } from "@components/molecules/emptyList";
import FilterMobileView from "@components/organisms/advancedFilterView/filterMobileView";
import { ICategoryView } from "@interface/category.interface";
import { InfoIcon } from "@components/atoms/icons";
import MobileView from "@components/organisms/categoryView/categoryMobileView";
import React from "react";
import TableView from "@components/organisms/categoryView/categoryTableView";
import { categoryQueryParamsAtom } from "@atom/category";
import { filterReportAtom } from "@atom/filter";
import { sortAtom } from "@atom/sortParam";
import useGetUserDocuments from "@hooks/document/useGetUserDocuments";

const SharedDocumentList = () => {
  const setActiveTour = useSetRecoilState(activeTourAtom);
  const getSortParams = useRecoilValue(sortAtom);
  const queryParams = useRecoilValue(categoryQueryParamsAtom);
  const getFilterReport = useRecoilValue(filterReportAtom);

  const {
    data: reportData,
    hasNextPage: reportHasNextPage,
    fetchNextPage: reportFetchNextPage,
    isFetchingNextPage: reportIsFetchingNextPage,
    isLoading: reportIsLoading,
    isFetching: reportIsFetching,
  } = useGetUserDocuments(
    undefined,
    getSortParams,
    queryParams.limit,
    getFilterReport,
    "myAccessDocuments",
    true
  );

  const commonProps: ICategoryView = {
    isLoading: reportIsLoading,
    getCategoryList: reportData,
    hasNextPage: reportHasNextPage,
    fetchNextPage: reportFetchNextPage,
    isFetchingNextPage: reportIsFetchingNextPage,
    isFetching: reportIsFetching,
    type: EEmptyList.CHILDREN,
  };

  return (
    <div className="flex flex-col gap-4 xs:gap-6">
      <div className="category-header flex justify-between items-center px-4 xs:px-0">
        <div className="flex items-center gap-1">
          <Typography className="title_t1 text-primary_normal">لیست اسناد</Typography>
          <Button
            className="rounded-lg p-0 bg-transparent shadow-none flex justify-center items-center"
            onClick={() => {
              setActiveTour(ETourSection.DOCUMENTS);
            }}
          >
            <InfoIcon className="w-5 h-5 stroke-purple-normal" />
          </Button>
        </div>
        <div className="flex xs:!hidden">
          <FilterMobileView />
        </div>
      </div>
      <div className="category-children hidden xs:block">
        <TableView {...commonProps} />
      </div>
      <div className="block xs:hidden">
        <MobileView {...commonProps} />
      </div>
    </div>
  );
};

export default SharedDocumentList;
