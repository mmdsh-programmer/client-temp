import { deleteBranchAction } from "@actions/branch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useDeleteBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-branch"],
    mutationFn: async (values: {
      branchId: number;
      parentId?: number;
      callBack?: () => void;
    }) => {
      const { branchId } = values;
      const response = await deleteBranchAction(branchId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (_, values) => {
      const { callBack, parentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`branch-${parentId || "root"}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeleteBranch;
