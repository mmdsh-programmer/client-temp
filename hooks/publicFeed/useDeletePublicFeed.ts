import { deletePublicFeedAction } from "@actions/publicFeed";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useDeletePublicFeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-public-feed"],
    mutationFn: async (values: {
      feedId: number;
      callBack?: () => void;
    }) => {
      const { feedId } = values;
      const response = await deletePublicFeedAction(feedId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      queryClient.invalidateQueries({
        queryKey: ["getPublicFeeds"],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeletePublicFeed; 