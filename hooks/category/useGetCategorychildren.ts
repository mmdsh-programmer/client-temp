import { ICategoryMetadata } from "@interface/category.interface";
import { IChildrenFilter } from "@interface/app.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import { IListResponse } from "@interface/repo.interface";
import { ISortProps } from "@atom/sortParam";
import { getChildrenAction } from "@actions/category";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetCategoryChildren = (
  repoId: number,
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
      `category-${categoryId || "parent"}-children${forMove ? "-for-move" : ""}${
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
        filters
      );

      return response as IListResponse<ICategoryMetadata | IDocumentMetadata>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!enabled,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetCategoryChildren;
