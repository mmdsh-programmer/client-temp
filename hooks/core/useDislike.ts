import { dislikeAction } from "@actions/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useDislike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["dislike"],
    mutationFn: async (values: { postId: number; callBack?: () => void }) => {
      const { postId } = values;
      const response = await dislikeAction(postId);
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
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDislike;
