import { getDomainPublishRepositoriesAction } from "@actions/domain";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetDomainPublishRepoList = (
  size: number,
) => {
  return useInfiniteQuery({
    queryKey: [
      "domain-publish-repo-list",
    ],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getDomainPublishRepositoriesAction(
        (pageParam - 1) * size,
        size,
      );
      return response;
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

export default useGetDomainPublishRepoList;
