import { getDomainDocumentsAction } from "@actions/domain";
import { ISearchSortParams } from "@components/organisms/publishSearch/publishAdvancedSearch";
import { IDomainDocuments } from "@interface/domain.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetDomainDocuments = (
  title: string,
  tagIds: number | number[] | undefined,
  creatorUserName: string | undefined,
  sortParams: ISearchSortParams,
  size: number,
) => {
  return useInfiniteQuery({
    queryKey: ["getDomainDocuments", title, tagIds, creatorUserName, sortParams, size],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getDomainDocumentsAction(
        title,
        tagIds,
        creatorUserName,
        sortParams,
        (pageParam - 1) * size,
        size,
      );
      return response as IDomainDocuments;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetDomainDocuments;
