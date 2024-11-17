import { IComment } from "@interface/version.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError, ISocialResponse } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { getPublishCommentListAction } from "@actions/publish";

const useGetPublishCommentList = (postId: number, size: number) => {
  return useInfiniteQuery({
    queryKey: [`get-publish-${postId}-comments`, size],
    queryFn: async ({ pageParam }) => {
      const response = await getPublishCommentListAction(
        postId,
        (pageParam - 1) * size,
        size
      );
      handleClientSideHookError(response as IActionError);
      return response as ISocialResponse<IComment[]>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!postId,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.count / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetPublishCommentList;
