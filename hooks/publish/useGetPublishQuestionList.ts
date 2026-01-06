import { IListResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { getPublishQuestionListAction } from "@actions/publish";
import { IQuestion } from "@interface/qa.interface";

const useGetPublishQuestionList = (documentId: number, size: number, enabled: boolean) => {
  return useInfiniteQuery({
    queryKey: [`publish-question-list-documentId-${documentId}`, size],
    queryFn: async ({ pageParam }) => {
      const response = await getPublishQuestionListAction(documentId, (pageParam - 1) * size, size);
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

export default useGetPublishQuestionList;
