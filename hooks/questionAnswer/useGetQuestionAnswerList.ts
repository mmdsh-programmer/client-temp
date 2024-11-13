import { IActionError, ISocialResponse } from "@interface/app.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { handleClientSideHookError } from "@utils/error";
import { getQuestionAnswerAction } from "@actions/questionAnswer";
import { IQAList } from "@interface/qa.interface";

const useGetQuestionAnswerList = (
  size: number,
  parentPostId?: number,
  enabled?: boolean
) => {
  return useInfiniteQuery({
    queryKey: [`question-answer-list${parentPostId ? `-${parentPostId}` : ""}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getQuestionAnswerAction(
        (pageParam - 1) * size,
        size,
        parentPostId
      );
      handleClientSideHookError(response as IActionError);
      return response as ISocialResponse<IQAList[]>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.count / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetQuestionAnswerList;
