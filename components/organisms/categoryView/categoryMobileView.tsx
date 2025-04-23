/* eslint-disable no-nested-ternary */

import CategoryBreadCrumb from "@components/molecules/categoryBreadCrumb";
import CategoryMobileCard from "@components/molecules/categoryMobileCard";
import DocumentMobileCard from "@components/molecules/documentMobileCard";
import EmptyList from "@components/molecules/emptyList";
import { ICategoryView } from "@interface/category.interface";
import LoadMore from "@components/molecules/loadMore";
import React from "react";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@material-tailwind/react";

const MobileView = ({
  isLoading,
  getCategoryList,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  type,
}: ICategoryView) => {
  const listLength = getCategoryList?.pages[0].total;

  return (
    <div className="category-mobile-view px-4 flex-grow flex-shrink-0">
      <div className="flex flex-col">
        <CategoryBreadCrumb />
      </div>
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="purple" />
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
              className="self-center !shadow-none underline text-[10px] text-primary_normal !font-normal"
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
