import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPositionAction } from "@actions/position";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });
};

export default useCreatePosition;
