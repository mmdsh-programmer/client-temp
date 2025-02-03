import { IActionError } from "@interface/app.interface";
import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import { IListResponse } from "@interface/repo.interface";
import { getAllPublishChildrenAction } from "@actions/publish";
import { handleClientSideHookError } from "@utils/error";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetAllPublishChildren = (
  repoId: number,
  size: number,
  categoryId?: number,
  title?: string,
  enabled?: boolean
) => {
  return useInfiniteQuery({
    queryKey: [
      `publish-category-${categoryId || "root"}${title ? `-${title}` : ""}-children`,
    ],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getAllPublishChildrenAction(
        repoId,
        (pageParam - 1) * size,
        size,
        categoryId,
        title
      );
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<ICategoryMetadata | IDocumentMetadata>;
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

export default useGetAllPublishChildren;
