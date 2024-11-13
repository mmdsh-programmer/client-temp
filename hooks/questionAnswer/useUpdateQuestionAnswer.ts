import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError, ISocialResponse } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { updateQuestionAnswerAction } from "@actions/questionAnswer";
import { IQAResponse } from "@interface/qa.interface";

const useUpdateQuestionAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-question-answer"],
    mutationFn: async (values: {
      name: string;
      content: string;
      entityId: number;
      canComment: boolean;
      canLike: boolean;
      enable: boolean;
      repliedPostId?: number;
      metadata?: string;
      callBack?: () => void;
    }) => {
      const {
        name,
        content,
        repliedPostId,
        entityId,
        canComment,
        canLike,
        enable,
        metadata,
      } = values;

      const response = await updateQuestionAnswerAction(
        entityId,
        name,
        content,
        repliedPostId,
        metadata,
        canComment,
        canLike,
        enable
      );

      handleClientSideHookError(response as IActionError);
      return response as ISocialResponse<IQAResponse>;
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

export default useUpdateQuestionAnswer;
