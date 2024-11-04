import { deleteRepoKeyAction } from "@actions/repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useDeleteRepoPublicKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteRepoKey"],
    mutationFn: async (values: {
      repoId: number;
      keyId: number;
      callBack?: () => void;
    }) => {
      const { repoId, keyId } = values;
      const response = await deleteRepoKeyAction(repoId, keyId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({
        queryKey: [`repo-${repoId}-public-keys`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeleteRepoPublicKey;
