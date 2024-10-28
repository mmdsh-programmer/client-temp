import { IActionError } from "@interface/app.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { handleClientSideHookError } from "@utils/error";
import { getPublishChildrenAction } from "@actions/publish";
import { IListResponse } from "@interface/repo.interface";
import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";

const useGetPublishChildren = (
  repoId: number,
  size: number,
  categoryId?: number,
  enabled?: boolean,
) => {
  return useInfiniteQuery({
    queryKey: [`publish-category-${categoryId || "parent"}-children`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getPublishChildrenAction(
        repoId,
        (pageParam - 1) * size,
        size,
        categoryId
      );
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<(ICategoryMetadata | IDocumentMetadata)>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetPublishChildren;
