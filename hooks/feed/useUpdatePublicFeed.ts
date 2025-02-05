import { updatePublicFeedAction } from "@actions/publicFeed";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useUpdatePublicFeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-public-feed"],
    mutationFn: async (values: {
      domainId: number;
      feedId: number;
      name: string;
      content: string;
      callBack?: () => void;
    }) => {
      const { domainId, feedId, name, content } = values;
      const response = await updatePublicFeedAction(domainId, feedId, name, content);
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

export default useUpdatePublicFeed; 