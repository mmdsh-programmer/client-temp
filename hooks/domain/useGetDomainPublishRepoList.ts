import { getDomainPublishRepositoriesAction } from "@actions/domain";
import { IListResponse, IRepo } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetDomainPublishRepoList = (size: number, enabled?: boolean) => {
  return useInfiniteQuery({
    queryKey: ["domain-publish-repo-list"],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getDomainPublishRepositoriesAction((pageParam - 1) * size, size);
      return response as IListResponse<IRepo>;
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

export default useGetDomainPublishRepoList;
