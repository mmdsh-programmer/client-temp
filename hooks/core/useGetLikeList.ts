import { getLikeAction } from "@actions/core";
import { IListResponse } from "@interface/repo.interface";
import { ILikeList } from "@interface/version.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetLikeList = (postId: number, size: number, enabled?: boolean) => {
  return useInfiniteQuery({
    queryKey: [`getLike-${postId}`, size],
    queryFn: async ({ pageParam }) => {
      const response = await getLikeAction(
        postId,
        (pageParam - 1) * size,
        size
      );
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<ILikeList>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!postId && enabled,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetLikeList;
