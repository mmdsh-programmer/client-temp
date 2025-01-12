import { IActionError, IChildrenFilter } from "@interface/app.interface";

import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import { IListResponse } from "@interface/repo.interface";
import { ISortProps } from "@atom/sortParam";
import { getChildrenAction } from "@actions/category";
import { handleClientSideHookError } from "@utils/error";
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
  const queryKey = [`category-${categoryId || "parent"}-children`];
  if (forMove) {
    queryKey.push("for-move");
  }
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
        filters
      );
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<ICategoryMetadata | IDocumentMetadata>;
    },
    initialPageParam: 1,
    retry: true,
    refetchOnWindowFocus: false,
    enabled: !!repoId && repoId !== 0 && !!enabled,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetCategoryChildren;
