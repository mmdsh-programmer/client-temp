import React, { Fragment } from "react";
import { ICategoryMetadata } from "@interface/category.interface";
import { bulkItems } from "atom/bulk";
import { categoryMoveDest, categoryQueryParams } from "atom/category";
import { sort } from "atom/sortParam";
import { useRecoilState, useRecoilValue } from "recoil";
import { repoAtom } from "@atom/repository";
import { Spinner, Typography } from "@material-tailwind/react";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import { FolderIcon } from "@components/atoms/icons";
import useGetCategoryChildren from "@hooks/category/useGetCategorychildren";

interface IProps {
  target: "category" | "document";
}

const MoveChildren = ({ target }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const [getCategoryMoveDest, setCategoryMoveDest] =
    useRecoilState(categoryMoveDest);
  const queryParams = useRecoilValue(categoryQueryParams);
  const getSortParams = useRecoilValue(sort);
  const getBulkItems = useRecoilValue(bulkItems);

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
