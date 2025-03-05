import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePositionAction } from "@actions/position";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useUpdatePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: {
      branchId: number;
      positionName: string;
      title: string;
      members: string[];
      callBack?: () => void;
    }) => {
      const { branchId, positionName, title, members } = values;
      const response = await updatePositionAction(
        branchId,
        positionName,
        title,
        members
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, branchId } = values;
      queryClient.invalidateQueries({
        queryKey: [`positions-${branchId}`],
      });

      callBack?.();
    },
  });
};

export default useUpdatePosition;
