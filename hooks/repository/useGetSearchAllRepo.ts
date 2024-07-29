import { getAllRepositoryList } from "@actions/repository";
import { IResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetSearchAllRepo = (size: number, name: string | undefined, enabled?: boolean) => {
  return useInfiniteQuery({
    queryKey: [`search-allRepoList-${name}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getAllRepositoryList(
        (pageParam - 1) * size,
        size,
        name
      );
      return response?.data as IResponse;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!name && !!enabled,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetSearchAllRepo;
