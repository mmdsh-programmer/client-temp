import { createRepoPublishLinkAction } from "@actions/publish";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCreatePublishLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`repo-publish`],
    mutationFn: async (values: {
      repoId: number;
      expireTime?: number;
      password?: string;
      callBack?: () => void;
    }) => {
      const { repoId, expireTime, password } = values;
      const response = await createRepoPublishLinkAction(
        repoId,
       expireTime,
       password
      );
      return response?.data;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({
        queryKey: [`getRepo-${repoId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreatePublishLink;
