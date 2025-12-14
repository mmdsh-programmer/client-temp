import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IActionError } from "@interface/app.interface";
import { deleteCategoryAction } from "@actions/category";
import { handleClientSideHookError } from "@utils/error";
import { toast } from "react-toastify";

// Define a custom error type
interface CustomError {
  message: string;
  code?: number;
  // Add other properties as needed
}

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: async (values: {
      repoId: number;
      categoryId: number;
      parentId: number | null;
      forceDelete: boolean;
      callBack?: () => void;
      errorCallBack?: (error: CustomError) => void // Use the custom error type
    }) => {
      const { repoId, categoryId, forceDelete } = values;
      const response = await deleteCategoryAction(
        repoId,
        categoryId,
        forceDelete,
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      window.metrics?.track("category:deleted");

      const { callBack, parentId, repoId } = values;
      queryClient.refetchQueries({
        queryKey: [`repo-${repoId}-category-${parentId || "root"}-children`],
      });
      callBack?.();
    },
    onError: (error: CustomError, values) => { // Use the custom error type
      const {errorCallBack} = values;
      toast.error(error.message || "خطای نامشخصی رخ داد");
      errorCallBack?.(error);
    },
  });
};

export default useDeleteCategory;
