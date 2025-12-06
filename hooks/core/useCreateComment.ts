import { createCommentAction } from "@actions/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createComment"],
    mutationFn: async (values: {
      repoId: number;
      docId: number;
      text: string;
      callBack?: () => void;
    }) => {
      const { repoId, docId, text } = values;
      const response = await createCommentAction(repoId, docId, text);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, docId } = values;
      queryClient.invalidateQueries({
        queryKey: [`getComments-repoId-${repoId}-docId-${docId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreateComment;
