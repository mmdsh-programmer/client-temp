import React, { useEffect } from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { IChildrenFilter } from "@interface/app.interface";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@components/atoms/spinner";
import TreeCatItem from "./treeCatItem";
import { useCategoryStore } from "@store/category";
import { useRepositoryStore } from "@store/repository";
import { useSortStore } from "@store/sortParam";
import useGetCategoryChildren from "@hooks/category/useGetCategorychildren";
import useGetUser from "@hooks/auth/useGetUser";
import { usePathname } from "next/navigation";

interface IProps {
  move?: boolean;
  enableAction?: boolean;
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

const ChildrenTree = ({ move, enableAction }: IProps) => {
  const getRepo = useRepositoryStore((s) => {
    return s.repo;
  });
  const queryParams = useCategoryStore((s) => {
    return s.categoryQueryParams;
  });
  const getSortParams = useSortStore((s) => {
    return s.sort;
  });
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
  const repoId =
    currentPath === "/admin/myDocuments" || currentPath === "/admin/dashboard"
      ? userInfo!.repository.id
      : getRepo!.id;

  const {
    data: categoryChildren,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useGetCategoryChildren(
    repoId,
    undefined,
    getSortParams,
    queryParams.limit,
    undefined,
    move ? "category" : undefined,
    move || enableAction ? undefined : docTemplateFilter,
    enableAction ? undefined : !!move,
  );

  useEffect(() => {
    refetch();
  }, [getSortParams, refetch]);

  return (
    <div
      className={`tree-wrapper ${enableAction ? "!h-full min-h-[calc(100vh-340px)]" : "!h-[400px] min-h-[300px] xs:!h-[300px]"}`}
    >
      <div
        className={`flex h-full flex-col ${enableAction ? "min-h-[calc(100vh-340px)] overflow-hidden" : "overflow-auto"} items-start`}
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {isLoading ? (
          <div className="flex h-[50px] w-full items-center justify-center">
            <Spinner className="h-6 w-6 text-primary" />
          </div>
        ) : categoryChildren?.pages[0].list.length ? (
          categoryChildren?.pages.map((page) => {
            return page.list.map((item) => {
              if (!item) {
                return null;
              }
              return (
                <div className="tree-item-wrapper w-full" key={item.id}>
                  <TreeCatItem catItem={item} move={move} enableAction={enableAction} />
                </div>
              );
            });
          })
        ) : (
          <EmptyList
            type={
              // eslint-disable-next-line no-nested-ternary
              move ? EEmptyList.CATEGORY : enableAction ? EEmptyList.CHILDREN : EEmptyList.TEMPLATE
            }
          />
        )}
        <RenderIf isTrue={!!hasNextPage}>
          <LoadMore
            className="self-center text-[10px] !font-normal text-primary_normal underline !shadow-none"
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        </RenderIf>
      </div>
    </div>
  );
};

export default ChildrenTree;
