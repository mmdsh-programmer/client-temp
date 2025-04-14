import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPositionAction } from "@actions/position";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { toast } from "react-toastify";

const useCreatePosition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: {
      branchId: number;
      title: string;
      members?: string[];
      callBack?: () => void;
    }) => {
      const { branchId, title, members } = values;
      const response = await createPositionAction(branchId, title, members);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, branchId } = values;
      queryClient.invalidateQueries({ queryKey: [`positions-${branchId}`] });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreatePosition;
