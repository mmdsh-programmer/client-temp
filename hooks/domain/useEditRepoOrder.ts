import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError, ISocialResponse } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { editRepoOrderAction } from "@actions/domain";

const useEditRepoOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-repo-order"],
    mutationFn: async (values: { repoId: number; order: number | null; callBack?: () => void }) => {
      const { repoId, order } = values;

      const response = await editRepoOrderAction(repoId, order);

      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      queryClient.invalidateQueries({
        queryKey: ["domain-publish-repo-list"],
      });

      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useEditRepoOrder;
