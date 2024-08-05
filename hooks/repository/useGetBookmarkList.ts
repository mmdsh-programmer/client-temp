import { getBookmarkRepositoryList } from "@actions/repository";
import { IRepo, IListResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetBookmarkList = (size: number, name?: string, enabled?: boolean) => {
  return useInfiniteQuery({
    queryKey: [`bookmarkRepoList-${name}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getBookmarkRepositoryList(
        (pageParam - 1) * size,
        size,
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

export default useGetBookmarkList;
