import { dislikeCommentAction } from "@actions/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useDislikeComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["dislike-comment"],
    mutationFn: async (values: {
      commentId: number;
      postId: number;
      dislike: boolean;
      callBack?: () => void;
    }) => {
      const { commentId, dislike } = values;
      const response = await dislikeCommentAction(commentId, dislike);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, postId } = values;

      queryClient.invalidateQueries({
        queryKey: [`get-publish-${postId}-comments`],
      });

      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDislikeComment;
