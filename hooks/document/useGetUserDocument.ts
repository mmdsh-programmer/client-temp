import { getChildrenAction } from "@actions/category";
import { getUserDocumentAction } from "@actions/document";
import { ISortProps } from "@atom/sortParam";
import { IChildrenFilter, IReportFilter } from "@interface/app.interface";
import { ICategoryChildren } from "@interface/category.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetUserDocument = (
  repoId: number | undefined,
  sortParams: ISortProps,
  size: number,
  filters?: IReportFilter | null,
  enabled?: boolean,
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
      return response?.data as ICategoryChildren;
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
