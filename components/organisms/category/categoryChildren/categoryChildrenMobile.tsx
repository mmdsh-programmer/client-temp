import React, { useState } from "react";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import { sort } from "@atom/sortParam";
import { categoryQueryParams, categoryShow } from "@atom/category";
import { filterChildren, filterReport } from "@atom/filter";
import { useInView } from "react-intersection-observer";
import useGetCategoryChildren from "@hooks/category/useGetCategorychildren";
import { Spinner } from "@material-tailwind/react";
import CategoryBreadCrumb from "../categoryBreadCrumb";
import RenderIf from "@components/renderIf";
import LoadMore from "@components/molecules/loadMore";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import MobileCard from "@components/molecules/mobileCard";
import { FaDateFromTimestamp } from "@utils/index";
import CategoryMenu from "@components/molecules/categoryMenu/categoryMenu";
import DocumentMenu from "@components/molecules/documentMenu";

const CategoryChildrenMobile = () => {
  const getRepo = useRecoilValue(repoAtom);
  const getSortParams = useRecoilValue(sort);
  const getCategoryShow = useRecoilValue(categoryShow);
  const queryParams = useRecoilValue(categoryQueryParams);
  const getFilterChildren = useRecoilValue(filterChildren);

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
    <div className=" px-4 flex-grow flex-shrink-0">
      <div className="flex flex-col">
        <CategoryBreadCrumb />
      </div>
      {childrenIsLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      ) : childrenData ? (
        <div className="flex flex-col gap-3">
          {childrenData?.pages.map((page) => {
            return page.list.map((item) => {
              return item.type === "category" ? (
                <MobileCard
                  key={item.id}
                  name={item.name}
                  createDate={
                    item.createdAt ? FaDateFromTimestamp(+item.createdAt) : "--"
                  }
                  creator={item.creator?.userName}
                  cardAction={<CategoryMenu category={item} />}
                />
              ) : (
                <MobileCard
                  key={item.id}
                  name={item.name}
                  createDate={
                    item.createdAt ? FaDateFromTimestamp(+item.createdAt) : "--"
                  }
                  creator={item.creator?.userName}
                  cardAction={<DocumentMenu document={item} />}
                />
              );
            });
          })}
        </div>
      ) : (
        <EmptyList type={EEmptyList.CATEGORY} />
      )}
    </div>
  );
};

export default CategoryChildrenMobile;
