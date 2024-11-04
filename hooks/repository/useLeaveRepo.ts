import { leaveRepoAction } from "@actions/repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useLeaveRepo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["leaveRepo"],
    mutationFn: async (values: { repoId: number; callBack?: () => void }) => {
      const { repoId } = values;
      const response = await leaveRepoAction(repoId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      queryClient.invalidateQueries({ queryKey: ["myRepoList-false"] });
      queryClient.invalidateQueries({ queryKey: ["myRepoList-false-isPublished"] });
      queryClient.invalidateQueries({ queryKey: ["allRepoList"] });
      queryClient.invalidateQueries({ queryKey: ["accessRepoList"] });
      queryClient.invalidateQueries({
        queryKey: ["getMyInfo"],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useLeaveRepo;
