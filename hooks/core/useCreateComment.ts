import { createCommentAction } from "@actions/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createComment"],
    mutationFn: async (values: {
      postId: number;
      text: string;
      callBack?: () => void;
    }) => {
      const { postId, text } = values;
      const response = await createCommentAction(postId, text);
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

export default useCreateComment;
