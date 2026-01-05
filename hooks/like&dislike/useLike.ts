import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { likePostAction } from "@actions/like&dislike";

const useLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["like"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      postId: number;
      callBack?: () => void;
    }) => {
      const { postId } = values;
      const response = await likePostAction(postId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, postId, repoId, documentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`getDislike-${postId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`getLike-${postId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`question-list-${repoId}-documentId-${documentId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [
          `answer-list-repoId-${repoId}-documentId-${documentId}-questionId-${postId}`,
        ],
      });

      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useLike;
