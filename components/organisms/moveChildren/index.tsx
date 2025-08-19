import React, { Fragment } from "react";
import { Typography } from "@material-tailwind/react";
import { useCategoryStore } from "@store/category";
import { useSortStore } from "@store/sortParam";
import { useBulkStore } from "@store/bulk";
import { FolderIcon } from "@components/atoms/icons";
import { ICategoryMetadata } from "@interface/category.interface";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import useGetCategoryChildren from "@hooks/category/useGetCategorychildren";
import { Spinner } from "@components/atoms/spinner";

interface IProps {
  target: "category" | "document";
  repoId: number;
}

const MoveChildren = ({ target, repoId }: IProps) => {
  const [getCategoryMoveDest, setCategoryMoveDest] = [
    useCategoryStore((state) => {
      return state.categoryMoveDest;
    }),
    useCategoryStore((state) => {
      return state.setCategoryMoveDest;
    }),
  ];
  const queryParams = useCategoryStore((state) => {
    return state.categoryQueryParams;
  });
  const getSortParams = useSortStore((state) => {
    return state.sort;
  });
  const getBulkItems = useBulkStore((state) => {
    return state.bulkItems;
  });

  const {
    data: moveChildren,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetCategoryChildren(
    repoId,
    getCategoryMoveDest?.id,
    getSortParams,
    queryParams.limit,
    undefined,
    "category",
    undefined,
    true,
  );

  const bulkItemsCategories = getBulkItems.filter((item) => {
    return item.type === "category";
  });

  return (
    <div className={`move-${target}-list`}>
      {isLoading ? (
        <div className="px-2 py-1">
          <Spinner className="h-4 w-4 text-primary" />
        </div>
      ) : (
        moveChildren?.pages.map((page) => {
          return (
            <Fragment key={page.offset}>
              {page.list.length ? (
                page.list.map((subItem) => {
                  if (
                    target === "category" &&
                    bulkItemsCategories?.some((bulkItem) => {
                      return bulkItem.id === subItem.id;
                    })
                  ) {
                    return null;
                  }
                  return (
                    <div
                      key={`move-category-${subItem.id}`}
                      className="move-category-item flex cursor-pointer items-center gap-2 px-2 py-1"
                      onClick={() => {
                        setCategoryMoveDest(subItem as ICategoryMetadata);
                      }}
                    >
                      <FolderIcon className="h-4 w-4 stroke-icon-active" />
                      <Typography className="caption_c1 text-primary_normal">
                        {subItem.name}
                      </Typography>
                    </div>
                  );
                })
              ) : (
                <Typography className="caption_c1 p-2 text-primary_normal">
                  موردی برای نمایش وجود ندارد
                </Typography>
              )}
            </Fragment>
          );
        })
      )}
      <RenderIf isTrue={hasNextPage}>
        <LoadMore isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
      </RenderIf>
    </div>
  );
};

export default MoveChildren;
