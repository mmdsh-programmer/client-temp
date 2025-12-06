import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError, ISocialResponse } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { updateQuestionAction } from "@actions/questionAnswer";
import { IQAResponse } from "@interface/qa.interface";

const useUpdateQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-question"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      entityId: number;
      title: string;
      content: string;
      callBack?: () => void;
    }) => {
      const { repoId, documentId, entityId, title, content } = values;

      const response = await updateQuestionAction(repoId, documentId, entityId, title, content);

      handleClientSideHookError(response as IActionError);
      return response as ISocialResponse<IQAResponse>;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, documentId } = values;
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

export default useUpdateQuestion;
