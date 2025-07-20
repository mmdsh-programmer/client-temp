import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { createPrivateFeedAction } from "@actions/privateFeed";

const useCreatePrivateFeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-private-feed"],
    mutationFn: async (values: {
      repoId: number;
      name: string;
      content: string;
      link?: string;
      image?: string;
      callBack?: () => void;
    }) => {
      const { repoId, name, content, link, image } = values;
      const response = await createPrivateFeedAction(repoId, name, content, link, image);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({
        queryKey: [`private-feeds-repoId-${repoId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreatePrivateFeed;
