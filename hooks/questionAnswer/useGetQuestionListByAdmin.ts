import { IActionError } from "@interface/app.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { handleClientSideHookError } from "@utils/error";
import { IQuestion } from "@interface/qa.interface";
import { IListResponse } from "@interface/repo.interface";
import { getQuestionListByAdminAction } from "@actions/questionAnswer";

const useGetQuestionListByAdmin = (
  repoId: number,
  documentId: number,
  size: number,
  enabled?: boolean,
) => {
  return useInfiniteQuery({
    queryKey: [`question-list-${repoId}-documentId-${documentId}-by-admin`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getQuestionListByAdminAction(
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
    enabled: !!enabled,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetQuestionListByAdmin;
