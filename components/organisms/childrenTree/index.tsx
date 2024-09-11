import EmptyList, { EEmptyList } from "@components/molecules/emptyList";

import { IChildrenFilter } from "@interface/app.interface";
import LoadMore from "@components/molecules/loadMore";
import React from "react";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@material-tailwind/react";
import TreeCatItem from "./trreCatItem";
import { categoryQueryParamsAtom } from "@atom/category";
import { repoAtom } from "@atom/repository";
import { sortAtom } from "@atom/sortParam";
import useGetCategoryChildren from "@hooks/category/useGetCategorychildren";
import { useRecoilValue } from "recoil";

interface IProps {
  move?: boolean;
}

export const docTemplateFilter: IChildrenFilter = {
  default: false,
  type: {
    category: true,
    document: true,
  },
  tagIds: [],
  isTemplate: true,
  bookmarked: false,
};

const ChildrenTree = ({ move }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const queryParams = useRecoilValue(categoryQueryParamsAtom);
  const getSortParams = useRecoilValue(sortAtom);

  const {
    data: categoryChildren,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetCategoryChildren(
    getRepo?.id!,
    undefined,
    getSortParams,
    queryParams.limit,
    undefined,
    move ? "category" : undefined,
    move ? undefined : docTemplateFilter,
    move ? true : false,
  );

  return (
    <div className="tree-wrapper !h-[400px] xs:!h-[300px] min-h-[300px]">
      <div className="h-full flex flex-col overflow-auto  items-start">
        {isLoading ? (
          <div className="w-full justify-center items-center flex h-[50px]">
            <Spinner color="deep-purple" />
          </div>
        ) : categoryChildren?.pages[0].list.length ? (
          categoryChildren?.pages.map((page) => {
            return page.list.map((item) => {
              if (!item) {
                return;
              }
              return (
                <div className="tree-item-wrapper" key={item.id}>
                  <TreeCatItem key={item.id} catItem={item} move={move} />
                </div>
              );
            });
          })
        ) : move ? (
          <EmptyList type={EEmptyList.CATEGORY} />
        ) : (
          <EmptyList type={EEmptyList.TEMPLATE} />
        )}
        <RenderIf isTrue={!!hasNextPage}>
          <LoadMore
            className="self-center !shadow-none underline text-[10px] text-primary !font-normal"
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        </RenderIf>
      </div>
    </div>
  );
};

export default ChildrenTree;
