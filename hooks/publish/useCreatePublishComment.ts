import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IActionError, ISocialResponse } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { createPublishCommentAction } from "@actions/publish";
import { toast } from "react-toastify";

const useCreatePublishComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-publish-comment"],
    mutationFn: async (values: {
      postId: number;
      text: string;
      shouldConfirm?: boolean;
      callBack?: () => void;
    }) => {
      const { postId, text, shouldConfirm } = values;
      const response = await createPublishCommentAction(
        postId,
        text,
        shouldConfirm
      );
      handleClientSideHookError(response as IActionError);
      return response as ISocialResponse<number>;
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

export default useCreatePublishComment;
