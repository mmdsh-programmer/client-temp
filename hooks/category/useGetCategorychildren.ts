import { getChildrenAction } from "@actions/category";
import { ISortProps } from "@atom/sortParam";
import { IChildrenFilter } from "@interface/app.interface";
import { ICategoryChildren } from "@interface/category.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetCategoryChildren = (
  repoId: number | undefined,
  categoryId: number | undefined | null,
  sortParams: ISortProps,
  size: number,
  title?: string | null,
  type?: "category" | "document",
  filters?: IChildrenFilter | null,
  forMove?: boolean,
  enabled = true
) => {
  return useInfiniteQuery({
    queryKey: [
      `repo-${repoId}-category-${categoryId || "parent"}-children${forMove ? "-for-move" : ""}${
        filters ? `-filters=${JSON.stringify(filters)}` : ""
      }`,
      title,
    ],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getChildrenAction(
        repoId,
        categoryId,
        sortParams,
        (pageParam - 1) * size,
        size,
        title,
        type,
        filters,
        forMove
      );
      return response?.data as ICategoryChildren;
    },
    initialPageParam: 1,
    retry: false,
    enabled: !!enabled,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetCategoryChildren;
