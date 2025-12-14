import { transferOwnershipRepositoryAction } from "@actions/repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useTranferOwnershipRepository = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["transferOwnershipRepo"],
    mutationFn: async (values: {
      repoId: number;
      userName: string;
      callBack?: () => void;
    }) => {
      const { userName, repoId } = values;
      const response = await transferOwnershipRepositoryAction(
        repoId,
        userName,
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      window.metrics?.track("repo:transfer_ownership");
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({queryKey: ["allRepoList"],});
      queryClient.invalidateQueries({queryKey: ["bookmarkRepoList"],});
      queryClient.invalidateQueries({queryKey: ["myRepoList-false"],});
      queryClient.invalidateQueries({ queryKey: ["myRepoList-false-isPublished"] });
      queryClient.invalidateQueries({queryKey: ["accessRepoList"],});
      queryClient.invalidateQueries({queryKey: [`getRepoUsers-${repoId}`],});
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

export default useTranferOwnershipRepository;
