import { getAllRepositoryList } from "@actions/repository";
import { IRepo, IListResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetAllRepositories = (
  size: number,
  name: string | undefined,
  enabled: boolean,
) => {
  return useInfiniteQuery({
    queryKey: [`allRepoList${name ? `-${name}` : ""}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getAllRepositoryList(
        (pageParam - 1) * size,
        size,
        name,
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

export default useGetAllRepositories;
