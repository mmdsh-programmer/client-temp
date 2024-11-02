import { likeAction } from "@actions/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["like"],
    mutationFn: async (values: {
      postId: number;
      like: boolean;
      callBack?: () => void;
    }) => {
      const { postId, like } = values;
      const response = await likeAction(postId, like);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, postId } = values;
      queryClient.invalidateQueries({
        queryKey: [`getDislike-${postId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`getLike-${postId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`post-${postId}-info`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useLike;
