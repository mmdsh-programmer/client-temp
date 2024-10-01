import CategoryBreadCrumb from "@components/molecules/categoryBreadCrumb";
import CategoryMenu from "@components/molecules/categoryMenu/categoryMenu";
import DocumentMenu from "@components/molecules/documentMenu";
import EmptyList from "@components/molecules/emptyList";
import { FaDateFromTimestamp } from "@utils/index";
import LoadMore from "@components/molecules/loadMore";
import MobileCard from "@components/molecules/mobileCard";
import React from "react";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@material-tailwind/react";
import { ICategoryView } from "@interface/category.interface";

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
    <div className=" px-4 flex-grow flex-shrink-0">
      <div className="flex flex-col">
        <CategoryBreadCrumb />
      </div>
       {/* eslint-disable-next-line no-nested-ternary */}
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      ) : listLength ? (
        <div className="flex flex-col gap-3">
          {getCategoryList?.pages.map((page) => {
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
          <RenderIf isTrue={!!hasNextPage}>
            <LoadMore
              className="self-center !shadow-none underline text-[10px] text-primary !font-normal"
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
