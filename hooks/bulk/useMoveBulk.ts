import { moveBulkAction } from "@actions/bulk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useMoveBulk = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["moveBulk"],
    mutationFn: async (values: {
      repoId: number;
      currentParentId: number | null;
      destCategory: number | null;
      children: number[];
      callBack?: () => void;
    }) => {
      const { repoId, destCategory, children } = values;
      const response = await moveBulkAction(repoId, destCategory, children);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, currentParentId, destCategory } = values;
      queryClient.invalidateQueries({
        queryKey: [`category-${currentParentId || "parent"}-children-for-move`],
      });
      queryClient.invalidateQueries({
        queryKey: [`category-${destCategory || "parent"}-children-for-move`],
      });
      queryClient.invalidateQueries({
        queryKey: [`category-${currentParentId || "parent"}-children`],
      });
      queryClient.invalidateQueries({
        queryKey: [`category-${destCategory || "parent"}-children`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useMoveBulk;
