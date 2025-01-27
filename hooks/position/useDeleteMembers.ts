import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMembersFromPositionAction } from "@actions/position";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useDeleteMembers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      branchId,
      positionName,
      members,
    }: {
      branchId: number;
      positionName: string;
      members: string[];
    }) => {
      const response = await deleteMembersFromPositionAction(branchId, positionName, members);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ["position", variables.branchId, variables.positionName] 
      });
    },
  });
};

export default useDeleteMembers; 