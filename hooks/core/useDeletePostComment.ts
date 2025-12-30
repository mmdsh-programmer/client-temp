import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { deletePostIdCommentAction } from "@actions/comment";

const useDeletePostComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deletePostComment"],
    mutationFn: async (values: { postId: number; commentId: number; callBack?: () => void }) => {
      const { commentId } = values;
      const response = await deletePostIdCommentAction(commentId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, postId } = values;
      queryClient.invalidateQueries({
        queryKey: [`get-post-comments-postId-${postId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeletePostComment;
