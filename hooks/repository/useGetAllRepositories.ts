import { getAllRepositoryList } from "@actions/repository";
import { IResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetAllRepositories = (size: number) => {
  return useInfiniteQuery({
    queryKey: [`allRepoList`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getAllRepositoryList(
        (pageParam - 1) * size,
        size,
        undefined
      );
      return response?.data as IResponse;
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

export default useGetAllRepositories;
