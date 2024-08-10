import React, { useState } from "react";
import { repoAtom } from "@atom/repository";
import { useRecoilState, useRecoilValue } from "recoil";
import { sort } from "@atom/sortParam";
import { categoryQueryParams, categoryShow } from "@atom/category";
import { filterChildren, filterReport } from "@atom/filter";
import useGetCategoryChildren from "@hooks/category/useGetCategorychildren";
import { Button, Spinner } from "@material-tailwind/react";
import CategoryBreadCrumb from "../categoryBreadCrumb";
import RenderIf from "@components/renderIf";
import LoadMore from "@components/molecules/loadMore";
import TableHead from "@components/molecules/tableHead";
import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import CategoryTableRow from "../../../molecules/categoryTableRow";
import DocumentTableRow from "@components/molecules/documentTableRow";
import { FilterIcon, SearchIcon } from "@components/atoms/icons";
import AdvancedSearch from "../search/advansedSearch";
import { SearchContent } from "../search/content/searchContent";

const CategoryChildrenDesktop = () => {
  const getRepo = useRecoilValue(repoAtom);
  const getSortParams = useRecoilValue(sort);
  const getCategoryShow = useRecoilValue(categoryShow);
  const queryParams = useRecoilValue(categoryQueryParams);
  const [getFilterChildren, setFilterChildren] = useRecoilState(filterChildren);
  const getFilterReport = useRecoilValue(filterReport);

  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const {
    data: childrenData,
    hasNextPage: childrenHasNextPage,
    fetchNextPage: childrenFetchNextPage,
    isFetchingNextPage: childrenIsFetchingNextPage,
    isLoading: childrenIsLoading,
    refetch: childrenRefetch,
    isFetching: childrenIsFetching,
  } = useGetCategoryChildren(
    getRepo?.id,
    getCategoryShow?.id,
    getSortParams,
    queryParams.limit,
    getFilterChildren?.title,
    undefined,
    getFilterChildren,
    true
  );

  const childrenLength = childrenData?.pages[0].total;

  return (
    <div className="category-children bg-primary px-5 min-h-[calc(100vh-340px)] flex-grow flex-shrink-0 rounded-lg shadow-small">
      <div className="flex items-center py-4 justify-between ">
        <CategoryBreadCrumb />
        <div className="flex gap-x-2">
          <Button
            onClick={() => {
              setOpenSearchModal(true);
            }}
            placeholder=""
            className="bg-white search-container  shadow-none border-2 border-gray-100 rounded-lg flex justify-center items-center p-1"
          >
            <SearchIcon className="h-5 w-5 stroke-gray-500" />
          </Button>
          <Button
            onClick={() => {
              setOpenFilter(!openFilter);
              if (openFilter) setFilterChildren(null);
            }}
            placeholder=""
            className="bg-white search-container shadow-none border-2 border-gray-100 rounded-lg flex justify-center items-center p-1"
          >
            <FilterIcon className="h-5 w-5 stroke-gray-500" />
          </Button>
        </div>
      </div>
      {openFilter ? <AdvancedSearch /> : null}
      {childrenIsLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      ) : childrenLength ? (
        <>
          <div className="w-full overflow-auto border-[0.5px] border-normal rounded-lg">
            <table className="w-full min-w-max ">
              <TableHead
                tableHead={[
                  { key: "select", value: "انتخاب", className: "" },
                  { key: "order", value: "اولویت", isSorted: true },
                  { key: "name", value: "نام دسته", isSorted: true },
                  { key: "createDate", value: "تاریخ ایجاد", isSorted: true },
                  { key: "editDate", value: "تاریخ ویرایش" },
                  { key: "creator", value: "نام سازنده" },
                  { key: "action", value: "عملیات" },
                ]}
              />
              <tbody>
                {childrenData?.pages.map((page) => {
                  return page.list.map((item) => {
                    return item.type === "category" ? (
                      <CategoryTableRow
                        key={item.id}
                        category={item as ICategoryMetadata}
                      />
                    ) : (
                      <DocumentTableRow
                        key={item.id}
                        document={item as IDocumentMetadata}
                      />
                    );
                  });
                })}
                <RenderIf isTrue={!!childrenHasNextPage}>
                  <LoadMore
                    className="self-center !shadow-none underline text-[10px] text-primary !font-normal"
                    isFetchingNextPage={childrenIsFetchingNextPage}
                    fetchNextPage={childrenFetchNextPage}
                  />
                </RenderIf>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <EmptyList type={EEmptyList.CATEGORY} />
      )}
      {openSearchModal && <SearchContent setOpen={setOpenSearchModal} />}
    </div>
  );
};

export default CategoryChildrenDesktop;
