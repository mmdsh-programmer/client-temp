import { getFollowingRepoFeedsAction } from "@actions/feeds";
import { IActionError } from "@interface/app.interface";
import { IListResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { handleClientSideHookError } from "@utils/error";

const useGetFollowinfRepoFeeds = (ssoId: number, repoId: number, size: number) => {
  return useInfiniteQuery({
    queryKey: [`user-${ssoId}-following-${repoId ? `-repo-${repoId}` : ""}-private-feeds`],
    queryFn: async ({ pageParam }) => {
      const response = await getFollowingRepoFeedsAction(repoId, (pageParam - 1) * size, size);
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<any>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!repoId && !!ssoId,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetFollowinfRepoFeeds;
