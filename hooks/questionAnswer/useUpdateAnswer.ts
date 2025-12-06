import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError, ISocialResponse } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { updateAnswerAction } from "@actions/questionAnswer";
import { IQAResponse } from "@interface/qa.interface";

const useUpdateAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-answer"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      questionId: number;
      entityId: number;
      title: string;
      content: string;
      callBack?: () => void;
    }) => {
      const { repoId, documentId, entityId, title, content } = values;

      const response = await updateAnswerAction(repoId, documentId, entityId, title, content);

      handleClientSideHookError(response as IActionError);
      return response as ISocialResponse<IQAResponse>;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, documentId, questionId } = values;
      queryClient.invalidateQueries({
        queryKey: [
          `answer-list-repoId-${repoId}-documentId-${documentId}-questionId-${questionId}`,
        ],
      });

      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useUpdateAnswer;
