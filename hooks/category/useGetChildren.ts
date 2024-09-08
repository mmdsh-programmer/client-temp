import { getChildrenAction } from "@actions/category";
import { ISortProps } from "@atom/sortParam";
import { IChildrenFilter } from "@interface/app.interface";
import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import { IListResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetChildren = (
  repoId: number | undefined,
  categoryId: number | undefined | null,
  sortParams: ISortProps,
  size: number,
  title?: string,
  type?: "category" | "document",
  filters?: IChildrenFilter | null,
) => {
  return useInfiniteQuery({
    queryKey: [`category-${categoryId || "parent"}-children${filters ? `-filters=${JSON.stringify(filters)}` : ""
    }`],
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
    enabled: !!categoryId && categoryId !== 0 && categoryId !== null,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetChildren;
