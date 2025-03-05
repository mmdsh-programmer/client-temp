import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setGrantsForPositionAction } from "@actions/position";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useSetGrants = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      branchId,
      positionName,
      serviceNames,
    }: {
      branchId: number;
      positionName: string;
      serviceNames: string[];
    }) => {
      const response = await setGrantsForPositionAction(
        branchId,
        positionName,
        serviceNames
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

export default useSetGrants;
