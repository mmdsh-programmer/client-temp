import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { updatePrivateFeedAction } from "@actions/privateFeed";

const useUpdatePrivateFeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-private-feed"],
    mutationFn: async (values: {
      repoId: number;

      feedId: number;
      name: string;
      content: string;
      link?: string;
      image?: string;
      callBack?: () => void;
    }) => {
      const { repoId, feedId, name, content, link, image } = values;
      const response = await updatePrivateFeedAction(
        repoId,
        feedId,
        name,
        content,
        link,
        image
      );
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

export default useUpdatePrivateFeed;
