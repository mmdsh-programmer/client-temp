import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError, ISocialResponse } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { confirmQuestionByAdminAction } from "@actions/questionAnswer";

const useConfirmQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["confirm-question"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      questionId: number;
      callBack?: () => void;
    }) => {
      const { repoId, documentId, questionId } = values;
      const response = await confirmQuestionByAdminAction(repoId, documentId, questionId);
      handleClientSideHookError(response as IActionError);
      return response as ISocialResponse<boolean>;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, documentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`question-list-${repoId}-documentId-${documentId}-by-admin`],
      });

      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useConfirmQuestion;
