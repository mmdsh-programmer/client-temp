import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePositionAction } from "@actions/position";
import { toast } from "react-toastify";
import { handleClientSideHookError } from "@utils/error";
import { IActionError } from "@interface/app.interface";

export const useDeletePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: {
      branchId: number;
      positionName: string;
      callBack?: () => void;
    }) => {
      const { branchId, positionName } = values;
      const response = await deletePositionAction(branchId, positionName);
      if (response) {
        handleClientSideHookError(response as IActionError);
      }
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, branchId } = values;
      queryClient.invalidateQueries({
        queryKey: [`positions-${branchId}`],
      });

      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};
