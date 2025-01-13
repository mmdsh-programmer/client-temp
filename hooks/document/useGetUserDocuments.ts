import { getUserDocumentAction } from "@actions/document";
import { ISortProps } from "@atom/sortParam";
import { IActionError, IReportFilter } from "@interface/app.interface";
import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import { IListResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { handleClientSideHookError } from "@utils/error";

const useGetUserDocuments = (
  repoId: number | undefined,
  sortParams: ISortProps,
  size: number,
  filters: IReportFilter | null,
  reportType: "myDocuments" | "myAccessDocuments" | null,
  enabled: boolean
) => {
  return useInfiniteQuery({
    queryKey: [
      `repo-${repoId}-children-user-document-${JSON.stringify(filters)}`,
    ],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getUserDocumentAction(
        repoId,
        sortParams,
        (pageParam - 1) * size,
        size,
        filters,
        reportType,
      );
      handleClientSideHookError(response as IActionError);
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

export default useGetUserDocuments;
