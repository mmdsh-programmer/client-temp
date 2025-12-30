import { deleteRepoAction } from "@actions/repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useDeleteRepo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteRepo"],
    mutationFn: async (values: { repoId: number; callBack?: () => void }) => {
      const { repoId } = values;
      const response = await deleteRepoAction(repoId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      window.metrics?.track("repo:deleted");
      queryClient.refetchQueries({
        queryKey: ["getMyInfo"],
      });
      queryClient.invalidateQueries({ queryKey: ["myRepoList-false"] });
      queryClient.invalidateQueries({ queryKey: ["myRepoList-true"] });
      queryClient.invalidateQueries({ queryKey: ["allRepoList"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarkRepoList"] });
      queryClient.invalidateQueries({ queryKey: ["myRepoList-false-isPublished"] });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeleteRepo;
