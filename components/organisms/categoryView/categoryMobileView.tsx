/* eslint-disable no-nested-ternary */

import CategoryBreadCrumb from "@components/molecules/categoryBreadCrumb";
import CategoryMobileCard from "@components/molecules/categoryMobileCard";
import DocumentMobileCard from "@components/molecules/documentMobileCard";
import EmptyList from "@components/molecules/emptyList";
import { ICategoryView } from "@interface/category.interface";
import LoadMore from "@components/molecules/loadMore";
import React from "react";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@components/atoms/spinner";
import { usePathname } from "next/navigation";

const MobileView = ({
  isLoading,
  getCategoryList,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  type,
}: ICategoryView) => {
  const currentPath = usePathname();

  const listLength = getCategoryList?.pages[0].total;

  return (
    <div
      className={`category-mobile-view flex-shrink-0 flex-grow ${currentPath === "/admin/dashboard" ? "px-0" : "px-4"}`}
    >
      <div className="flex flex-col">
        <CategoryBreadCrumb />
      </div>
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="h-8 w-8 text-primary" />
        </div>
      ) : listLength ? (
        <div className="category-list flex flex-col gap-3">
          {getCategoryList?.pages.map((page) => {
            return page.list.map((item) => {
              return item ? (
                item.type === "category" ? (
                  <CategoryMobileCard key={item.id} category={item} />
                ) : (
                  <DocumentMobileCard key={item.id} document={item} />
                )
              ) : null;
            });
          })}
          <RenderIf isTrue={!!hasNextPage}>
            <LoadMore
              className="self-center text-[10px] !font-normal text-primary_normal underline !shadow-none"
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          </RenderIf>
        </div>
      ) : (
        <EmptyList type={type} />
      )}
    </div>
  );
};

export default MobileView;
