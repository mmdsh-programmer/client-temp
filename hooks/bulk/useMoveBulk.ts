import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { moveBulkAction } from "@actions/bulk";
import { toast } from "react-toastify";

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
        queryKey: [`category-${currentParentId || "root"}-children-for-move`],
      });
      queryClient.invalidateQueries({
        queryKey: [`category-${destCategory || "root"}-children-for-move`],
      });
      queryClient.invalidateQueries({
        queryKey: [`category-${currentParentId || "root"}-children`],
      });
      queryClient.invalidateQueries({
        queryKey: [`category-${destCategory || "root"}-children`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useMoveBulk;
