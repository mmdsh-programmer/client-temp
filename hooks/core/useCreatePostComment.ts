import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { createPostIdCommentAction } from "@actions/comment";

const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createPostComment"],
    mutationFn: async (values: { postId: number; text: string; callBack?: () => void }) => {
      const { postId, text } = values;
      const response = await createPostIdCommentAction(postId, text);
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

export default useCreateComment;
