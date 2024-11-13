import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError, ISocialResponse } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { delteQuestionAnswerAction } from "@actions/questionAnswer";

const useDeleteQuestionAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-question-answer"],
    mutationFn: async (values: {
      postIds: number[];
      repliedPostId?: number;
      callBack?: () => void;
    }) => {
      const { postIds } = values;

      const response = await delteQuestionAnswerAction(postIds);

      handleClientSideHookError(response as IActionError);
      return response as ISocialResponse<boolean>;
    },
    onSuccess: (response, values) => {
      const { callBack, repliedPostId } = values;
      queryClient.invalidateQueries({
        queryKey: [
          `question-answer-list${repliedPostId ? `-${repliedPostId}` : ""}`,
        ],
      });

      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeleteQuestionAnswer;
