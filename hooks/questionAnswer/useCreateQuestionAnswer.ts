import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError, ISocialResponse } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { createQuestionAnswerAction } from "@actions/questionAnswer";
import { IQAResponse } from "@interface/qa.interface";

const useCreateQuestionAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-question-answer"],
    mutationFn: async (values: {
      name: string;
      content: string;
      repliedPostId?: number;
      metadata?: string;
      callBack?: () => void;
    }) => {
      const { name, content, repliedPostId, metadata } = values;
      const response = await createQuestionAnswerAction(
        name,
        content,
        repliedPostId,
        metadata
      );
      handleClientSideHookError(response as IActionError);
      return response as ISocialResponse<IQAResponse>;
    },
    onSuccess: (response, values) => {
      const { callBack, repliedPostId } = values;
      queryClient.invalidateQueries({
        queryKey: [`question-answer-list${repliedPostId ? `-${repliedPostId}` : ""}`],
      });

      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreateQuestionAnswer;
