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
      callBack?: () => void;
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
    onSuccess: (response, values) => {
      const { callBack } = values;
      queryClient.invalidateQueries({
        queryKey: ["position", values.branchId, values.positionName],
      });
      callBack?.();
    },
  });
};

export default useAddMembers;
