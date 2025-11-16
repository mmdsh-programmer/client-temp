import { imageRepoAction } from "@actions/repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useAddImageToRepo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["imageRepo"],
    mutationFn: async (values: {
      repoId: number;
      fileHash: string | null;
      callBack?: () => void;
    }) => {
      const { fileHash, repoId } = values;
      const response = await imageRepoAction(repoId, fileHash);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({ queryKey: ["myRepoList-false"] });
      queryClient.invalidateQueries({ queryKey: ["allRepoList"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarkRepoList"] });
      queryClient.invalidateQueries({ queryKey: ["accessRepoList"] });
      queryClient.invalidateQueries({ queryKey: ["myRepoList-false-isPublished"] });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useAddImageToRepo;
