import { IActionError, IChildrenFilter } from "@interface/app.interface";
import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import { IListResponse } from "@interface/repo.interface";
import { getChildrenAction } from "@actions/category";
import { handleClientSideHookError } from "@utils/error";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ISortProps } from "@store/sortParam";

const useGetChildren = (
  repoId: number,
  categoryId: number | undefined | null,
  sortParams: ISortProps,
  size: number,
  title?: string,
  type?: "category" | "document",
  filters?: IChildrenFilter | null,
) => {
  const queryKey = [`repo-${repoId}-category-${categoryId || "root"}-children`];
  if (filters) {
    queryKey.push(`filters=${JSON.stringify(filters)}`);
  }

  return useInfiniteQuery({
    queryKey,
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
      );
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<ICategoryMetadata | IDocumentMetadata>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled:
      !!repoId && !!categoryId && categoryId !== 0 && categoryId !== null,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetChildren;
