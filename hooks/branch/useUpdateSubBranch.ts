import { updateSubBranchAction } from "@actions/branch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useUpdateSubBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-sub-branch"],
    mutationFn: async (values: {
      branchId: number;
      name: string;
      callBack?: () => void;
    }) => {
      const { branchId, name } = values;
      const response = await updateSubBranchAction(branchId, name);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (_, values) => {
      const { callBack, branchId } = values;
      queryClient.invalidateQueries({ queryKey: [`branches-${branchId}`] });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useUpdateSubBranch;
