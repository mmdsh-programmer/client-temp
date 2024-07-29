import React, { useState } from "react";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import { sort } from "@atom/sortParam";
import { categoryQueryParams, categoryShow } from "@atom/category";
import { filterChildren, filterReport } from "@atom/filter";
import { useInView } from "react-intersection-observer";
import useGetCategoryChildren from "@hooks/category/useGetCategorychildren";
import { Card, Checkbox, Spinner } from "@material-tailwind/react";
import CategoryBreadCrumb from "../categoryBreadCrumb";
import RenderIf from "@components/renderIf";
import LoadMore from "@components/molecules/loadMore";
import TableHead from "@components/molecules/tableHead";
import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import TableCell from "@components/molecules/tableCell";
import CategoryTableRow from "../../../molecules/categoryTableRow";
import DocumentTableRow from "@components/molecules/documentTableRow";

const CategoryChildrenDesktop = () => {
  const getRepo = useRecoilValue(repoAtom);
  const getSortParams = useRecoilValue(sort);
  const getCategoryShow = useRecoilValue(categoryShow);
  const queryParams = useRecoilValue(categoryQueryParams);
  const getFilterChildren = useRecoilValue(filterChildren);
  const getFilterReport = useRecoilValue(filterReport);

  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const { ref, inView } = useInView();

  const {
    data: childrenData,
    hasNextPage: childrenHasNextPage,
    fetchNextPage: childrenFetchNextPage,
    isFetchingNextPage: childrenIsFetchingNextPage,
    isLoading: childrenIsLoading,
    refetch: childrenRefetch,
  } = useGetCategoryChildren(
    getRepo?.id,
    getCategoryShow?.id,
    getSortParams,
    20,
    getFilterChildren?.title,
    undefined,
    getFilterChildren,
    false
  );

  return (
    <div className="bg-primary px-5 min-h-[calc(100vh-300px)] flex-grow flex-shrink-0 rounded-lg shadow-small">
      <div className="flex flex-col">
        <CategoryBreadCrumb />
      </div>
      {childrenIsLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      ) : childrenData ? (
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
              </tbody>
            </table>
          </div>

          <div className="block xs:hidden"></div>
        </>
      ) : (
        <EmptyList type={EEmptyList.CATEGORY} />
      )}
    </div>
  );
};

export default CategoryChildrenDesktop;
