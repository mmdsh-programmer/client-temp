import { IActionError } from "@interface/app.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { handleClientSideHookError } from "@utils/error";
import { IListResponse } from "@interface/repo.interface";
import { ICommentItem } from "@interface/version.interface";
import { getCommentListByAdminAction } from "@actions/questionAnswer";

const useGetCommentListByAdmin = (
  repoId: number,
  documentId: number,
  size: number,
  enabled?: boolean,
) => {
  return useInfiniteQuery({
    queryKey: [`comment-list-${repoId}-documentId-${documentId}-by-admin`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getCommentListByAdminAction(
        repoId,
        documentId,
        (pageParam - 1) * size,
        size,
      );
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<ICommentItem>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetCommentListByAdmin;
