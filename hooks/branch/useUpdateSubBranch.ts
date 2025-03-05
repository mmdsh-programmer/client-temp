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
      username: string;
      parentId: number;
      callBack?: () => void;
    }) => {
      const { branchId, name, username } = values;
      const response = await updateSubBranchAction(branchId, name, username);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (_, values) => {
      const { callBack, parentId } = values;
      queryClient.invalidateQueries({ queryKey: [`branch-${parentId || "root"}`] });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useUpdateSubBranch;
