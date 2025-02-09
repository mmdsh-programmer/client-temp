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
      feedId: number;
      name: string;
      content: string;
      callBack?: () => void;
    }) => {
      const { feedId, name, content } = values;
      const response = await updatePublicFeedAction(feedId, name, content);
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

export default useUpdatePublicFeed;
