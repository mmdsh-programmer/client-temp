import React, { useState } from "react";
import { Spinner } from "@material-tailwind/react";
import RenderIf from "@components/atoms/renderIf";
import LoadMore from "@components/molecules/loadMore";
import TableHead from "@components/molecules/tableHead";
import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import EmptyList from "@components/molecules/emptyList";
import DocumentTableRow from "@components/molecules/documentTableRow";
import CategoryBreadCrumb from "@components/molecules/categoryBreadCrumb";
import { ICategoryView } from "../category/categoryChildren";
import CategoryTableRow from "@components/molecules/categoryTableRow";
import SearchFilter from "@components/molecules/searchFilter";
import AdvancedFilter from "@components/molecules/advancedFilter";

const TableView = ({
  isLoading,
  getCategoryList,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  isFetching,
  type,
}: ICategoryView) => {
  const [openFilter, setOpenFilter] = useState(false);

  const listLength = getCategoryList?.pages[0].total;

  return (
    <div className="category-children flex flex-col bg-primary min-h-[calc(100vh-340px)] h-full flex-grow flex-shrink-0 rounded-lg shadow-small">
      <div className="flex items-center py-4 px-5 justify-between">
        <CategoryBreadCrumb />
        <SearchFilter open={openFilter} setOpen={setOpenFilter} />
      </div>
      {openFilter ? <AdvancedFilter /> : null}
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      ) : listLength ? (
        <div className="px-5 py-4 overflow-auto">
          <div className="w-full border-[0.5px] overflow-auto border-normal rounded-lg">
            <table className="w-full overflow-hidden min-w-max ">
              <TableHead
                tableHead={[
                  { key: "select", value: "انتخاب", className: "" },
                  { key: "order", value: "اولویت", isSorted: true, className: "hidden xl:table-cell" },
                  { key: "name", value: "نام دسته", isSorted: true },
                  { key: "createDate", value: "تاریخ ایجاد", isSorted: true },
                  { key: "editDate", value: "تاریخ ویرایش", className: "hidden xl:table-cell" },
                  { key: "creator", value: "نام سازنده", className: "hidden lg:table-cell" },
                  { key: "action", value: "عملیات" },
                ]}
              />              
              <tbody>
                {getCategoryList?.pages.map((page) => {
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
                <RenderIf isTrue={!!hasNextPage}>
                  <LoadMore
                    className="self-center !shadow-none underline xl:bg-primary text-[10px] text-primary !font-normal"
                    isFetchingNextPage={isFetchingNextPage}
                    fetchNextPage={fetchNextPage}
                  />
                </RenderIf>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="py-4">
          <EmptyList type={type} />
        </div>
      )}
    </div>
  );
};

export default TableView;
