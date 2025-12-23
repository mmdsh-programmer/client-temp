import { IActionError } from "@interface/app.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { handleClientSideHookError } from "@utils/error";
import { getAnswerListAction } from "@actions/questionAnswer";
import { IListResponse } from "@interface/repo.interface";

const useGetAnswerList = (
  repoId: number,
  documentId: number,
  questionId: number,
  size: number,
  enabled?: boolean,
) => {
  return useInfiniteQuery({
    queryKey: [`answer-list-repoId-${repoId}-documentId-${documentId}-questionId-${questionId}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getAnswerListAction(
        repoId,
        documentId,
        questionId,
        (pageParam - 1) * size,
        size,
      );
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<any>;
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

export default useGetAnswerList;
