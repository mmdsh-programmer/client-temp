import React, { Fragment } from "react";
import { Spinner, Typography } from "@material-tailwind/react";
import { categoryMoveDestAtom, categoryQueryParamsAtom } from "atom/category";
import { useRecoilState, useRecoilValue } from "recoil";

import { FolderIcon } from "@components/atoms/icons";
import { ICategoryMetadata } from "@interface/category.interface";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import { bulkItemsAtom } from "@atom/bulk";
import { repoAtom } from "@atom/repository";
import { sortAtom } from "atom/sortParam";
import useGetCategoryChildren from "@hooks/category/useGetCategorychildren";

interface IProps {
  target: "category" | "document";
}

const MoveChildren = ({ target }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const [getCategoryMoveDest, setCategoryMoveDest] =
    useRecoilState(categoryMoveDestAtom);
  const queryParams = useRecoilValue(categoryQueryParamsAtom);
  const getSortParams = useRecoilValue(sortAtom);
  const getBulkItems = useRecoilValue(bulkItemsAtom);

  const {
    data: moveChildren,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetCategoryChildren(
    getRepo?.id!,
    getCategoryMoveDest?.id,
    getSortParams,
    queryParams.limit,
    undefined,
    "category",
    undefined,
    true
  );

  const bulkItemsCategories = getBulkItems.filter((item) => {
    return item.type === "category";
  });

  return (
    <div>
      {isLoading ? (
        <div className="px-2 py-1">
          <Spinner className="h-4 w-4" color="deep-purple" />
        </div>
      ) : (
        moveChildren?.pages.map((page, index) => {
          return (
            <Fragment key={`fragment-${index}`}>
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
                      className="flex items-center gap-2 px-2 py-1 cursor-pointer"
                      onClick={() => {
                        setCategoryMoveDest(subItem as ICategoryMetadata);
                      }}
                    >
                      <FolderIcon className="w-4 h-4 stroke-icon-active" />
                      <Typography className="caption_c1 text-primary">
                        {subItem.name}
                      </Typography>
                    </div>
                  );
                })
              ) : (
                <Typography className="caption_c1 text-primary p-2">
                  موردی برای نمایش وجود ندارد
                </Typography>
              )}
            </Fragment>
          );
        })
      )}
      <RenderIf isTrue={hasNextPage}>
        <LoadMore
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </RenderIf>
    </div>
  );
};

export default MoveChildren;
