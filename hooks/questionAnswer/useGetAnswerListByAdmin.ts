import { IActionError } from "@interface/app.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { handleClientSideHookError } from "@utils/error";
import { IListResponse } from "@interface/repo.interface";
import { IQuestion } from "@interface/qa.interface";
import { getAnswerListByAdminAction } from "@actions/questionAnswer";

const useGetAnswerListByAdmin = (
  repoId: number,
  documentId: number,
  questionId: number,
  size: number,
  enabled?: boolean,
) => {
  return useInfiniteQuery({
    queryKey: [`answer-list-repoId-${repoId}-documentId-${documentId}-questionId-${questionId}-by-admin`, size],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getAnswerListByAdminAction(
        repoId,
        documentId,
        questionId,
        (pageParam - 1) * size,
        size,
      );
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<IQuestion>;
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

export default useGetAnswerListByAdmin;
