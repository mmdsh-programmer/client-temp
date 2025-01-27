import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignPositionToSubBranchAction } from "@actions/position";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useAssignPositionToSubBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      branchId,
      subBranchId,
      positionName,
    }: {
      branchId: number;
      subBranchId: number;
      positionName: string;
    }) => {
      const response = await assignPositionToSubBranchAction(branchId, subBranchId, positionName);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });
};

export default useAssignPositionToSubBranch; 