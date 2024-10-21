import { getDislikeAction } from "@actions/core";
import { IListResponse } from "@interface/repo.interface";
import { ILikeList } from "@interface/version.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetDislikeList = (postId: number, size: number) => {
  return useInfiniteQuery({
    queryKey: [`getDislike-${postId}`, size],
    queryFn: async ({ pageParam }) => {
      const response = await getDislikeAction(
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
    enabled: !!postId,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetDislikeList;
