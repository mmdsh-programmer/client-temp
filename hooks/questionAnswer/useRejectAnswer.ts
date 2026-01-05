import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError, ISocialResponse } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { rejectAnswerByAdminAction } from "@actions/questionAnswer";

const useRejectAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["reject-answer"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      questionId: number;
      entityId: number;
      callBack?: () => void;
    }) => {
      const { repoId, documentId, questionId } = values;
      const response = await rejectAnswerByAdminAction(repoId, documentId, questionId);
      handleClientSideHookError(response as IActionError);
      return response as ISocialResponse<boolean>;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, documentId, questionId } = values;
      queryClient.invalidateQueries({
        queryKey: [
          `answer-list-repoId-${repoId}-documentId-${documentId}-questionId-${questionId}-by-admin`,
        ],
      });
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

export default useRejectAnswer;
