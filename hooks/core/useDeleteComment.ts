import { deleteCommentAction } from "@actions/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: async (values: {
      repoId: number;
      docId: number;
      commentId: number;
      callBack?: () => void;
    }) => {
      const { repoId, docId, commentId } = values;
      const response = await deleteCommentAction(repoId, docId, commentId);
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

export default useDeleteComment;
