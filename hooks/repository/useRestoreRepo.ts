import { restoreRepoAction } from "@actions/repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useRestoreRepo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["restoreRepo"],
    mutationFn: async (values: { repoId: number; callBack?: () => void }) => {
      const { repoId } = values;
      const response = await restoreRepoAction(repoId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      window.metrics?.track("repo:restored");
      const { callBack } = values;
      queryClient.invalidateQueries({
        queryKey: ["getMyInfo"],
      });
      queryClient.invalidateQueries({ queryKey: ["myRepoList-true"] });
      queryClient.invalidateQueries({ queryKey: ["myRepoList-false"] });
      queryClient.invalidateQueries({ queryKey: ["myRepoList-false-isPublished"] });
      queryClient.invalidateQueries({ queryKey: ["allRepoList"] });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useRestoreRepo;
