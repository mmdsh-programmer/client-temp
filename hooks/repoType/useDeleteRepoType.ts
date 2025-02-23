import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { deleteRepoTypeAction } from "@actions/repoType";

const useDeleteRepoType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-repoType"],
    mutationFn: async (values: { branchId: number; callBack?: () => void }) => {
      const { branchId } = values;
      const response = await deleteRepoTypeAction(branchId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (_, values) => {
      const { callBack } = values;
      queryClient.invalidateQueries({ queryKey: ["get-repo-types"] });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeleteRepoType;
