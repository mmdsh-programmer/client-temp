import { dislikeCommentAction } from "@actions/like&dislike";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useDislikeComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["dislike-comment"],
    mutationFn: async (values: {
      repoId: number;
      docId: number;
      commentId: number;
      postId: number;
      callBack?: () => void;
    }) => {
      const { commentId } = values;
      const response = await dislikeCommentAction(commentId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, postId, repoId, docId } = values;

      queryClient.invalidateQueries({
        queryKey: [`get-post-comments-postId-${postId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`comment-list-${repoId}-documentId-${docId}`],
      });

      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDislikeComment;
