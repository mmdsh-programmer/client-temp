import { createSubBranchAction } from "@actions/branch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useCreateSubBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-sub-branch"],
    mutationFn: async (values: {
      branchId: number;
      name: string;
      repoType: string;
      username: string;
      callBack?: () => void;
    }) => {
      const { branchId, name, repoType, username } = values;
      const response = await createSubBranchAction(
        branchId,
        name,
        repoType,
        username
      );
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

export default useCreateSubBranch;
