import { getDomainDocumentsAction } from "@actions/domain";
import { ISearchSortParams } from "@components/organisms/publishSearch/publishAdvancedSearch";
import { IDomainDocuments } from "@interface/domain.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetDomainDocuments = (
  repoId: number | undefined,
  title: string | undefined,
  tagIds: number | number[] | undefined,
  creatorUserName: string | undefined,
  sortParams: ISearchSortParams | undefined,
  size: number,
) => {
  return useInfiniteQuery({
    queryKey: ["getDomainDocuments",repoId, title, tagIds, creatorUserName, sortParams, size],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getDomainDocumentsAction(
        repoId,
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
