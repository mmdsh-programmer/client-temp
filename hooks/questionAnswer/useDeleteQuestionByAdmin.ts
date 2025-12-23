import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError, ISocialResponse } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { deleteQuestionByAdminAction } from "@actions/questionAnswer";

const useDeleteQuestionByAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-question-by-admin"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      questionId: number;
      postIds: number[];
      callBack?: () => void;
    }) => {
      const { repoId, documentId, questionId, postIds } = values;

      const response = await deleteQuestionByAdminAction(repoId, documentId, questionId, postIds);

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

export default useDeleteQuestionByAdmin;
