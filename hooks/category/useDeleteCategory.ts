import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCategoryAction } from "@actions/category";
import { toast } from "react-toastify";
import { handleClientSideHookError } from "@utils/error";
import { IActionError } from "@interface/app.interface";

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
      const { callBack, parentId } = values;
      queryClient.refetchQueries({
        queryKey: [`category-${parentId || "parent"}-children`],
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
