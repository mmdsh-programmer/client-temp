import { deleteBulkAction } from "@actions/bulk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useDeleteBulk = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteBulk"],
    mutationFn: async (values: {
      repoId: number;
      parentId: number | undefined;
      children: number[];
      forceDelete: boolean;
      callBack?: () => void;
    }) => {
      const { repoId, children, forceDelete } = values;
      const response = await deleteBulkAction(repoId, children, forceDelete);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, parentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`category-${parentId || "parent"}-children`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeleteBulk;
