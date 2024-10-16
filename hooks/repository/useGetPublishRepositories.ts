import { getPublishRepositoriesAction } from "@actions/repository";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetPublishRepositories = (
  size: number,
  repoType?: string,
  userssoid?: number
) => {
  return useInfiniteQuery({
    queryKey: [
      `publish-repo-list${repoType ? `-${repoType}` : ""}${userssoid ? `-${userssoid}` : ""}`,
    ],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getPublishRepositoriesAction(
        (pageParam - 1) * size,
        size,
        repoType,
        userssoid
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
