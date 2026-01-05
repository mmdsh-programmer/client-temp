import { getCommentListAction } from "@actions/comment";
import { IListResponse } from "@interface/repo.interface";
import { IComment } from "@interface/version.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetCommentList = (repoId: number, docId: number, size: number) => {
  return useInfiniteQuery({
    queryKey: [`comment-list-${repoId}-documentId-${docId}`, size],
    queryFn: async ({ pageParam }) => {
      const response = await getCommentListAction(repoId, docId, (pageParam - 1) * size, size);
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<IComment>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!repoId && !!docId,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetCommentList;
