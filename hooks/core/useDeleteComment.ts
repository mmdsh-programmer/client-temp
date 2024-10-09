import { deleteCommentAction } from "@actions/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: async (values: {
      postId: number;
      commentId: number
      callBack?: () => void;
    }) => {
      const { commentId } = values;
      const response = await deleteCommentAction(commentId);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, postId } = values;
      queryClient.invalidateQueries({
        queryKey: [`getComments-${postId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeleteComment;
