import { getAccessRepositoryList } from "@actions/repository";
import { IRepo, IResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetAccessList = (size: number, name?: string, enabled?: boolean) => {
  return useInfiniteQuery({
    queryKey: [`accessRepoList-${name}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getAccessRepositoryList(
        (pageParam - 1) * size,
        size,
        name
      );
      return response?.data as IResponse<IRepo>;
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

export default useGetAccessList;
