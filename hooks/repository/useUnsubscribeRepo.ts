import { unsubscribeFromRepoAction } from "@actions/repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useUnsubscribeRepo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["unsubscribe-repo"],
    mutationFn: async (values: {
      repoId: number;
      ssoId: number;
      callBack?: () => void;
    }) => {
      const { repoId } = values;
      const response = await unsubscribeFromRepoAction(repoId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, ssoId } = values;
      queryClient.invalidateQueries({
        queryKey: [`repo-${repoId}-user-${ssoId}-subscription-status`],
      });
      queryClient.invalidateQueries({
        queryKey: [`user-${ssoId}-private-feeds`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useUnsubscribeRepo;
