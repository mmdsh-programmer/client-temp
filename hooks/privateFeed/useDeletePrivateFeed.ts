import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { deletePrivateFeedAction } from "@actions/privateFeed";

const useDeletePrivateFeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-private-feed"],
    mutationFn: async (values: {
      repoId: number;
      feedId: number;
      callBack?: () => void;
    }) => {
      const { repoId, feedId } = values;
      const response = await deletePrivateFeedAction(repoId, feedId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      queryClient.invalidateQueries({
        queryKey: ["getPrivateFeeds"],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeletePrivateFeed;
