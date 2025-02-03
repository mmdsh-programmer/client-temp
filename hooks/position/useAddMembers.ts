import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMembersToPositionAction } from "@actions/position";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useAddMembers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: {
      branchId: number;
      positionName: string;
      members: string[];
    }) => {
      const { branchId, positionName, members } = values;
      const response = await addMembersToPositionAction(
        branchId,
        positionName,
        members
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["position", variables.branchId, variables.positionName],
      });
    },
  });
};

export default useAddMembers;
