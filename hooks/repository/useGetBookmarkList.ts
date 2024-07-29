import { getBookmarkRepositoryList } from "@actions/repository";
import { IResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetBookmarkList = (size: number) => {
  return useInfiniteQuery({
    queryKey: [`bookmarkRepoList`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getBookmarkRepositoryList(
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

export default useGetBookmarkList;
