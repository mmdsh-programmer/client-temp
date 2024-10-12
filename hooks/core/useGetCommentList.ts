import { getCommentListAction } from "@actions/core";
import { IListResponse } from "@interface/repo.interface";
import { IComment } from "@interface/version.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetCommentList = (postId: number, size: number) => {
  return useInfiniteQuery({
    queryKey: [`getComments-${postId}`, size],
    queryFn: async ({ pageParam }) => {
      const response = await getCommentListAction(
        postId,
        (pageParam - 1) * size,
        size,
      );
      return response as IListResponse<IComment>;
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

export default useGetCommentList;
