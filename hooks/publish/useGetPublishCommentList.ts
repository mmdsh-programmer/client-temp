import { IListResponse } from "@interface/repo.interface";
import { IComment } from "@interface/version.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { getPublishCommentListAction } from "@actions/publish";

const useGetPublishCommentList = (documentId: number, size: number, enabled?: boolean) => {
  return useInfiniteQuery({
    queryKey: [`publish-comment-list-documentId-${documentId}`, size],
    queryFn: async ({ pageParam }) => {
      const response = await getPublishCommentListAction(documentId, (pageParam - 1) * size, size);
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<IComment>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!enabled,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetPublishCommentList;
