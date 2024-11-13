import { dislikeAction } from "@actions/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useDislike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["dislike"],
    mutationFn: async (values: {
      postId: number;
      dislike: boolean;
      parentPostId?: number;
      callBack?: () => void;
    }) => {
      const { postId, dislike } = values;
      const response = await dislikeAction(postId, dislike);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, postId, parentPostId } = values;
      queryClient.invalidateQueries({
        queryKey: [`getDislike-${postId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`getLike-${postId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`post-${postId}-info`],
      });

      queryClient.invalidateQueries({
        queryKey: [`question-answer-list${parentPostId ? `-${parentPostId}` : ""}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDislike;
