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
      domainId: number;
      feedId: number;
      callBack?: () => void;
    }) => {
      const { domainId, feedId } = values;
      const response = await deletePublicFeedAction(domainId, feedId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, domainId } = values;
      queryClient.invalidateQueries({
        queryKey: [`getPublicFeeds-${domainId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeletePublicFeed; 