import { getUserDocumentAction } from "@actions/document";
import { ISortProps } from "@atom/sortParam";
import { IReportFilter } from "@interface/app.interface";
import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import { IListResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetUserDocument = (
  repoId: number | undefined,
  sortParams: ISortProps,
  size: number,
  filters?: IReportFilter | null,
  enabled?: boolean
) => {
  return useInfiniteQuery({
    queryKey: [`repo-${repoId}-children-${JSON.stringify(filters)}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getUserDocumentAction(
        repoId,
        sortParams,
        (pageParam - 1) * size,
        size,
        filters
      );
      return response?.data as IListResponse<
        ICategoryMetadata | IDocumentMetadata
      >;
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

export default useGetUserDocument;
