import { createRepoPublishLinkAction } from "@actions/publish";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useCreatePublishLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["repo-publish"],
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
        password,
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({
        queryKey: [`getRepo-${repoId}`],
      });

      queryClient.invalidateQueries({
        queryKey: ["myRepoList-false-isPublished"],
      });

      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreatePublishLink;
