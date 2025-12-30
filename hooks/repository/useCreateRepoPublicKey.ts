import { createRepoKeyAction } from "@actions/repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { IPublicKey } from "@interface/repo.interface";

const useCreateRepoPublicKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createRepoKey"],
    mutationFn: async (values: {
      repoId: number;
      name: string;
      key: string;
      callBack?: () => void;
    }) => {
      const { repoId, name, key } = values;
      const response = await createRepoKeyAction(repoId, name, key);
      handleClientSideHookError(response as IActionError);
      return response as IPublicKey;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId } = values;
      window.metrics?.track("repo:create_public_key");
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

export default useCreateRepoPublicKey;
