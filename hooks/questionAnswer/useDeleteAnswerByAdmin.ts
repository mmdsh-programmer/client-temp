import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError, ISocialResponse } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { deleteAnswerByAdminAction } from "@actions/questionAnswer";

const useDeleteQuestionByAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-answer-by-admin"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      questionId: number;
      postIds: number[];
      callBack?: () => void;
    }) => {
      const { repoId, documentId, postIds } = values;

      const response = await deleteAnswerByAdminAction(repoId, documentId, postIds);

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

      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeleteQuestionByAdmin;
