import { bookmarkRepoAction } from "@actions/repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useBookmarkRepo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["bookmarkRepo"],
    mutationFn: async (values: {
      repoId: number;
      detach?: boolean;
      callBack?: () => void;
    }) => {
      const { detach, repoId } = values;
      const response = await bookmarkRepoAction(repoId, detach);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({
        queryKey: ["getMyInfo"],
      });
      queryClient.invalidateQueries({ queryKey: ["allRepoList"], });
      queryClient.invalidateQueries({ queryKey: ["bookmarkRepoList"], });
      queryClient.invalidateQueries({ queryKey: ["myRepoList-false"], });
      queryClient.invalidateQueries({ queryKey: ["accessRepoList"], });
      queryClient.invalidateQueries({ queryKey: ["myRepoList-false-isPublished"] });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useBookmarkRepo;
