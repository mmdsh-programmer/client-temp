import { createPublicFeedAction } from "@actions/publicFeed";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useCreatePublicFeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-public-feed"],
    mutationFn: async (values: {
      name: string;
      content: string;
      link?: string, 
      image?: string
      callBack?: () => void;
    }) => {
      const {  name, content, link, image } = values;
      const response = await createPublicFeedAction( name, content, link, image);
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

export default useCreatePublicFeed; 