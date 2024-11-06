import { getPublishRepositoriesAction } from "@actions/repository";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetPublishRepositories = (
  size: number,
) => {
  return useInfiniteQuery({
    queryKey: [
      "publish-repo-list",
    ],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getPublishRepositoriesAction(
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

export default useGetPublishRepositories;
