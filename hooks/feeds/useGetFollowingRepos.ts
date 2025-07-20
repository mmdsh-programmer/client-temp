import { getFollowingReposAction } from "@actions/feeds";
import { IActionError } from "@interface/app.interface";
import { IFollowingRepo } from "@interface/feeds.interface";
import { IListResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { handleClientSideHookError } from "@utils/error";

const useGetFollowingRepos = (ssoId: number, size: number) => {
  return useInfiniteQuery({
    queryKey: [`user-${ssoId}-following-repos`],
    queryFn: async ({ pageParam }) => {
      const response = await getFollowingReposAction((pageParam - 1) * size, size);
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<IFollowingRepo>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    // enabled: !!ssoId,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetFollowingRepos;
