/* eslint-disable no-nested-ternary */

import { Button, Typography } from "@material-tailwind/react";
import { ICategoryMetadata, ICategoryView } from "@interface/category.interface";
import React, { useState } from "react";
import { useFilterStore } from "@store/filter";
import { useSortStore } from "@store/sortParam";
import AdvancedFilter from "@components/molecules/advancedFilter";
import CategoryBreadCrumb from "@components/molecules/categoryBreadCrumb";
import CategoryTableRow from "@components/molecules/categoryTableRow";
import { DeleteIcon } from "@components/atoms/icons";
import DocumentTableRow from "@components/molecules/documentTableRow";
import EmptyList from "@components/molecules/emptyList";
import { IDocumentMetadata } from "@interface/document.interface";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import SearchFilter from "@components/molecules/searchFilter";
import { Spinner } from "@components/atoms/spinner";
import TableHead from "@components/molecules/tableHead";
import { usePathname } from "next/navigation";

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
  const {
    filterChildren: getFilterChildren,
    setFilterChildren,
    filterReport: getFilterReport,
    setFilterReport,
  } = useFilterStore();

  const { sort: getSortParams, setSort: setSortParams } = useSortStore();

  const listLength = getCategoryList?.pages[0].total;

  const renderContent = () => {
    if (listLength) {
      return (
        <div className="category-table-view overflow-auto px-5 py-4">
          <div className="w-full overflow-auto rounded-lg border-[0.5px] border-normal">
            <table className="w-full min-w-max table-auto overflow-hidden">
              <TableHead
                tableHead={
                  [
                    currentPath === "/admin/sharedDocuments" || currentPath === "/admin/dashboard"
                      ? null
                      : {
                          key: "select",
                          value: "انتخاب",
                          className: "categoryBulk !pr-2 !pl-0 !max-w-[50px] !w-[50px]",
                        },
                    currentPath === "/admin/dashboard"
                      ? null
                      : {
                          key: "order",
                          value: "اولویت",
                          isSorted: true,
                          sortAction: () => {
                            setSortParams({
                              ...getSortParams,
                              order: getSortParams.order === "asc" ? "desc" : "asc",
                            });
                          },
                          className:
                            "categoryOrder whitespace-nowrap hidden !px-2 xl:flex !max-w-[80px] !w-[80px]",
                        },
                    {
                      key: "name",
                      value: "نام دسته",
                      isSorted: true,
                      sortAction: () => {
                        setSortParams({
                          ...getSortParams,
                          order: getSortParams.name === "asc" ? "desc" : "asc",
                        });
                      },
                    },
                    currentPath === "/admin/dashboard"
                      ? null
                      : {
                          key: "createDate",
                          value: "تاریخ ایجاد",
                          isSorted: true,
                          sortAction: () => {
                            setSortParams({
                              ...getSortParams,
                              order: getSortParams.createdAt === "asc" ? "desc" : "asc",
                            });
                          },
                          className: "!px-2 whitespace-nowrap text-center px-4",
                        },
                    currentPath === "/admin/dashboard"
                      ? null
                      : {
                          key: "editDate",
                          value: "تاریخ ویرایش",
                          className: "hidden xl:table-cell whitespace-nowrap text-center px-2",
                        },
                    {
                      key: "creator",
                      value: "نام سازنده",
                      className: "hidden lg:table-cell whitespace-nowrap text-center",
                    },
                    {
                      key: "action",
                      value: "عملیات",
                      className: "category-action !pr-0 !pl-1 !max-w-[50px] !w-[50px]",
                    },
                  ].filter(Boolean) as ITableHead[]
                }
              />
              <tbody>
                {getCategoryList?.pages.map((page) => {
                  return page.list.map((item) => {
                    return item ? (
                      item.type === "category" ? (
                        <CategoryTableRow key={item.id} category={item as ICategoryMetadata} />
                      ) : (
                        <DocumentTableRow key={item.id} document={item as IDocumentMetadata} />
                      )
                    ) : null;
                  });
                })}
                <RenderIf isTrue={!!hasNextPage}>
                  <tr>
                    <td colSpan={7} className="py-4 !text-center">
                      <div className="flex items-center justify-center">
                        <LoadMore
                          className="self-center text-[10px] !font-normal text-primary_normal underline !shadow-none xl:bg-primary"
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
      className={`category-children-table flex flex-col bg-white ${currentPath === "/admin/myDocuments" || currentPath === "/admin/sharedDocuments" ? "min-h-[calc(100vh-200px)]" : "min-h-[calc(100vh-340px)]"} ${currentPath === "/admin/dashboard" ? "!h-[calc(100vh-220px)] !min-h-[calc(100vh-220px)] overflow-auto" : "min-h-[calc(100vh-340px)]"} h-full flex-shrink-0 flex-grow rounded-lg shadow-small`}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <CategoryBreadCrumb />
        {currentPath === "/admin/dashboard" ? null : (
          <SearchFilter open={openFilter} setOpen={setOpenFilter} />
        )}
      </div>
      {openFilter ? <AdvancedFilter setOpen={setOpenFilter} /> : null}
      {!openFilter && (getFilterChildren || getFilterReport) ? (
        <div className="px-5">
          <Button
            className="h-7 w-max gap-1 rounded-full bg-error px-3"
            onClick={() => {
              setFilterChildren(null);
              setFilterReport(null);
            }}
            placeholder=""
            {...({} as Omit<React.ComponentProps<typeof Button>, "placeholder">)}
          >
            <DeleteIcon className="h-4 w-4 fill-white" />
            <Typography
              placeholder=""
              className="label text-white"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              حذف فیلتر
            </Typography>
          </Button>
        </div>
      ) : null}
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="h-8 w-8 text-primary" />
        </div>
      ) : (
        renderContent()
      )}
    </div>
  );
};

export default TableView;
