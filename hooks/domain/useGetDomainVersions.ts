import { getDomainVersionsAction } from "@actions/domain";
import { ISearchSortParams } from "@components/organisms/publishSearch/publishAdvancedSearch";
import { IDomainVersions } from "@interface/domain.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetDomainVersions = (
  repoId: number | undefined,
  docId: number | undefined,
  title: string,
  docTitle: string | undefined,
  creatorUserName: string | undefined,
  sortParams: ISearchSortParams,
  withTemplate: string | undefined,
  isTemplate: string | undefined,
  contentType: string | undefined,
  size: number,
) => {
  return useInfiniteQuery({
    queryKey: [
      "getDomainVersions",
      repoId,
      docId,
      title,
      docTitle,
      creatorUserName,
      sortParams,
      size,
    ],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getDomainVersionsAction(
        repoId,
        docId,
        title,
        docTitle,
        creatorUserName,
        sortParams,
        withTemplate,
        isTemplate,
        contentType,
        (pageParam - 1) * size,
        size,
      );
      return response as IDomainVersions;
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

export default useGetDomainVersions;
