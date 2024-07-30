import React from "react";
import { categoryQueryParams } from "@atom/category";
import { repoAtom } from "@atom/repository";
import { sort } from "@atom/sortParam";
import Text from "@components/atoms/typograghy/text";
import useGetCategoryChildren from "@hooks/category/useGetCategorychildren";
import { IChildrenFilter } from "@interface/app.interface";
import { Spinner } from "@material-tailwind/react";
import { useRecoilValue } from "recoil";
import RenderIf from "@components/renderIf";
import LoadMore from "@components/molecules/loadMore";
import TreeCatItem from "./treeCatItem";

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

const DocumentTemplateTree = () => {
  const getRepo = useRecoilValue(repoAtom);
  const queryParams = useRecoilValue(categoryQueryParams);
  const getSortParams = useRecoilValue(sort);

  const {
    data: categoryChildren,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetCategoryChildren(
    getRepo?.id,
    undefined,
    getSortParams,
    queryParams.limit,
    undefined,
    undefined,
    docTemplateFilter,
    false
  );

  return (
    <div className="tree-wrapper h-[270px] ">
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
                  <TreeCatItem key={item.id} catItem={item} />
                </div>
              );
            });
          })
        ) : (
          <Text className="w-full text-center">نمونه سندی ایجاد نشده است.</Text>
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

export default DocumentTemplateTree;
