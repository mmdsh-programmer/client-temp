import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError, ISocialResponse } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { rejectCommentByAdminAction } from "@actions/questionAnswer";

const useRejectComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["reject-comment"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      commentId: number;
      callBack?: () => void;
    }) => {
      const { repoId, documentId, commentId } = values;
      const response = await rejectCommentByAdminAction(repoId, documentId, commentId);
      handleClientSideHookError(response as IActionError);
      return response as ISocialResponse<boolean>;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, documentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`comment-list-${repoId}-documentId-${documentId}-by-admin`],
      });

      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useRejectComment;
