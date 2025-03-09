/* eslint-disable no-nested-ternary */

import React, { useState } from "react";
import {
  ICategoryMetadata,
  ICategoryView,
} from "@interface/category.interface";
import AdvancedFilter from "@components/molecules/advancedFilter";
import CategoryBreadCrumb from "@components/molecules/categoryBreadCrumb";
import CategoryTableRow from "@components/molecules/categoryTableRow";
import DocumentTableRow from "@components/molecules/documentTableRow";
import EmptyList from "@components/molecules/emptyList";
import { IDocumentMetadata } from "@interface/document.interface";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import SearchFilter from "@components/molecules/searchFilter";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import TableHead from "@components/molecules/tableHead";
import { usePathname } from "next/navigation";
import { useRecoilState } from "recoil";
import { filterChildrenAtom, filterReportAtom } from "@atom/filter";
import { DeleteIcon } from "@components/atoms/icons";

interface ITableHead {
  key: string;
  value: string;
  isSorted?: boolean;
  className?: string;
}

const TableView = ({
  isLoading,
  getCategoryList,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  type,
}: ICategoryView) => {
  const currentPath = usePathname();
  const [openFilter, setOpenFilter] = useState(false);
  const [getFilterChildren, setFilterChildren] =
    useRecoilState(filterChildrenAtom);
  const [getFilterReport, setFilterReport] = useRecoilState(filterReportAtom);

  const listLength = getCategoryList?.pages[0].total;

  const renderContent = () => {
    if (listLength) {
      return (
        <div className="px-5 py-4 overflow-auto">
          <div className="w-full border-[0.5px] overflow-auto border-normal rounded-lg">
            <table className="w-full overflow-hidden min-w-max table-auto xl:table-fixed">
              <TableHead
                tableHead={
                  [
                    currentPath !== "/admin/sharedDocuments"
                      ? {
                          key: "select",
                          value: "انتخاب",
                          className:
                            "categoryBulk !pr-2 !pl-0 !max-w-[50px] !w-[50px]",
                        }
                      : null,
                    {
                      key: "order",
                      value: "اولویت",
                      isSorted: true,
                      className:
                        "categoryOrder whitespace-nowrap hidden !px-1 xl:table-cell !max-w-[70px] !w-[70px]",
                    },
                    {
                      key: "name",
                      value: "نام دسته",
                      isSorted: true,
                      className: "whitespace-nowrap !max-w-[180px] !w-[180px] sm:!max-w-[300px] sm:!w-[300px] md:!max-w-[250px] md:!w-[250px] xl:!max-w-[50%] xl:!w-[40%] !px-2",
                    },
                    { key: "createDate", value: "تاریخ ایجاد", isSorted: true, className: "!px-2 whitespace-nowrap" },
                    {
                      key: "editDate",
                      value: "تاریخ ویرایش",
                      className: "hidden xl:table-cell whitespace-nowrap",
                    },
                    {
                      key: "creator",
                      value: "نام سازنده",
                      className: "hidden lg:table-cell whitespace-nowrap",
                    },
                    {
                      key: "action",
                      value: "عملیات",
                      className:
                        "category-action !pr-0 !pl-1 !max-w-[50px] !w-[50px]",
                    },
                  ].filter(Boolean) as ITableHead[]
                }
              />
              <tbody>
                {getCategoryList?.pages.map((page) => {
                  return page.list.map((item) => {
                    return item ? (
                      item.type === "category" ? (
                        <CategoryTableRow
                          key={item.id}
                          category={item as ICategoryMetadata}
                        />
                      ) : (
                        <DocumentTableRow
                          key={item.id}
                          document={item as IDocumentMetadata}
                        />
                      )
                    ) : null;
                  });
                })}
                <RenderIf isTrue={!!hasNextPage}>
                  <tr>
                    <td colSpan={7} className="!text-center py-4">
                      <div className="flex justify-center items-center">
                        <LoadMore
                          className="self-center !shadow-none underline xl:bg-primary text-[10px] text-primary !font-normal"
                          isFetchingNextPage={isFetchingNextPage}
                          fetchNextPage={fetchNextPage}
                        />
                      </div>
                    </td>
                  </tr>
                </RenderIf>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    return (
      <div className="py-4">
        <EmptyList type={type} />
      </div>
    );
  };

  return (
    <div
      className={`category-children-table flex flex-col bg-primary ${currentPath === "/admin/myDocuments" || currentPath === "/admin/sharedDocuments" ? "min-h-[calc(100vh-200px)]" : "min-h-[calc(100vh-340px)]"} h-full flex-grow flex-shrink-0 rounded-lg shadow-small`}
    >
      <div className="flex items-center py-4 px-5 justify-between">
        <CategoryBreadCrumb />
        <SearchFilter open={openFilter} setOpen={setOpenFilter} />
      </div>
      {openFilter ? <AdvancedFilter setOpen={setOpenFilter} /> : null}
      {!openFilter && (getFilterChildren || getFilterReport) ? (
        <div className="px-5">
          <Button
            className="bg-error h-7 w-max rounded-full gap-1 px-3"
            onClick={() => {
              setFilterChildren(null);
              setFilterReport(null);
            }}
          >
            <DeleteIcon className="h-4 w-4 fill-white" />
            <Typography className="label text-white">حذف فیلتر</Typography>
          </Button>
        </div>
      ) : null}
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      ) : (
        renderContent()
      )}
    </div>
  );
};

export default TableView;
