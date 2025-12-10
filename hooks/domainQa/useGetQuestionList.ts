import { IActionError } from "@interface/app.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { handleClientSideHookError } from "@utils/error";
import { IQuestion } from "@interface/qa.interface";
import { getQuestionListAction } from "@actions/questionAnswer";
import { IListResponse } from "@interface/repo.interface";

const useGetDomainQuestionList = (
  repoId: number,
  documentId: number,
  size: number,
  enabled?: boolean
) => {
  return useInfiniteQuery({
    queryKey: [`domain-question-list-${repoId}-documentId-${documentId}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getQuestionListAction(
        repoId,
        documentId,
        (pageParam - 1) * size,
        size,
      );
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<IQuestion>;
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

export default useGetDomainQuestionList;
