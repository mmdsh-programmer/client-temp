import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError, ISocialResponse } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { createQuestionAction } from "@actions/questionAnswer";
import { IQAResponse } from "@interface/qa.interface";

const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-question"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      title: string;
      content: string;
      callBack?: () => void;
    }) => {
      const { repoId, documentId, title, content } = values;
      const response = await createQuestionAction(repoId, documentId, title, content);
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

export default useCreateQuestion;
