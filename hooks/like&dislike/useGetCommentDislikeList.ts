import { IListResponse } from "@interface/repo.interface";
import { ILikeList } from "@interface/version.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { getCommentDislikeAction } from "@actions/like&dislike";

const useGetCommentDislikeList = (commentId: number, size: number, enabled?: boolean) => {
  return useInfiniteQuery({
    queryKey: [`getCommentDislike-${commentId}`, size],
    queryFn: async ({ pageParam }) => {
      const response = await getCommentDislikeAction(commentId, (pageParam - 1) * size, size);
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<ILikeList>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!commentId && enabled,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetCommentDislikeList;
