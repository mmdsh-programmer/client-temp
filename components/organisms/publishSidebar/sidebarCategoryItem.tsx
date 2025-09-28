import React, { Fragment, useEffect } from "react";
import { ICategoryMetadata } from "@interface/category.interface";
import SidebarCollapse from "./sidebarCollapse";
import SidebarDocumentItem from "./sidebarDocumentItem";
import { toPersianDigit } from "@utils/index";
import useGetPublishChildren from "@hooks/publish/useGetPublishChildren";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@components/atoms/spinner";

interface IProps {
  repoId: number;
  repoName: string;
  category: ICategoryMetadata;
  parentUrl: string;
  categoryIds: number[];
}

const SidebarCategoryItem = ({ repoId, repoName, category, parentUrl, categoryIds }: IProps) => {
  const searchParams = useSearchParams();
  const ids = searchParams.get("ids");
  const defaultState = ids?.includes(toPersianDigit(category.id).toString());

  const {
    data: categoryChildren,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useGetPublishChildren(repoId, 10, category.id);

  const total = categoryChildren?.pages[0].total;

  useEffect(() => {
    refetch();
  }, [repoId]);

  if (!isLoading && !total) {
    return (
      <span className="pb-3 pr-2 pt-2 text-[10px] text-gray-700">موردی برای نمایش وجود ندارد</span>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center py-2">
          <Spinner className="h-5 w-5 text-primary" />
        </div>
      ) : (
        categoryChildren?.pages.map((page) => {
          return (
            <Fragment key={`fragment-card-${page.list[0]?.id}`}>
              {page.list?.length
                ? page.list.map((childItem) => {
                    if (childItem && childItem.type === "category" && !childItem.isHidden) {
                      const catIds = [...categoryIds, childItem.id];
                      return (
                        <SidebarCollapse
                          key={`category-${childItem.id}-tree-item-${childItem.id}`}
                          title={childItem?.name || "بدون نام"}
                          defaultOpen={!!defaultState}
                        >
                          <SidebarCategoryItem
                            repoId={repoId}
                            repoName={repoName}
                            category={childItem}
                            parentUrl={parentUrl}
                            categoryIds={catIds}
                          />
                        </SidebarCollapse>
                      );
                    }

                    if (childItem && childItem.type === "document" && !childItem.isHidden) {
                      return (
                        <SidebarDocumentItem
                          key={`category-${childItem.categoryId}-document-${childItem.id}-tree-item`}
                          document={childItem}
                          parentUrl={parentUrl}
                          categoryIds={categoryIds}
                        />
                      );
                    }

                    return null;
                  })
                : null}
            </Fragment>
          );
        })
      )}

      {!!hasNextPage && !isFetchingNextPage && (
        <button
          className="mb-3 mt-2 w-fit text-[10px] text-primary_normal underline underline-offset-8"
          onClick={() => {
            fetchNextPage();
          }}
          disabled={isFetchingNextPage}
        >
          نمایش موارد بیشتر
        </button>
      )}

      {isFetchingNextPage && (
        <div className="flex w-full justify-center pt-4">
          <Spinner className="h-5 w-5 text-primary" />
        </div>
      )}
    </>
  );
};

export default SidebarCategoryItem;
