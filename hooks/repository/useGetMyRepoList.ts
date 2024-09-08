import { getMyRepositoryList } from "@actions/repository";
import { IRepo, IListResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetMyRepoList = (
  size: number,
  archived: boolean,
  name?: string,
  enabled?: boolean
) => {
  return useInfiniteQuery({
    queryKey: [`myRepoList-${archived}${name ? `-${name}` : ""}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getMyRepositoryList(
        (pageParam - 1) * size,
        size,
        archived,
        name
      );
      return response as IListResponse<IRepo>;
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

export default useGetMyRepoList;
