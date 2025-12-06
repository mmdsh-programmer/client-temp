import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError, ISocialResponse } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { deleteAnswerAction } from "@actions/questionAnswer";

const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-answer"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      questionId: number;
      entityId: number;
      callBack?: () => void;
    }) => {
      const { repoId, documentId, entityId } = values;

      const response = await deleteAnswerAction(repoId, documentId, entityId);

      handleClientSideHookError(response as IActionError);
      return response as ISocialResponse<boolean>;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, documentId, questionId } = values;
      queryClient.invalidateQueries({
        queryKey: [
          `answer-list-repoId-${repoId}-documentId-${documentId}-questionId-${questionId}`,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [`question-list-${repoId}-documentId-${documentId}`],
      });

      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeleteQuestion;
