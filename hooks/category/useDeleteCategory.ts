import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCategoryAction } from "@actions/category";
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
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, parentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`category-${parentId || "parent"}-children`],
      });
      callBack?.();
    },
    onError: (error: CustomError, values) => { // Use the custom error type
      debugger;
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log(error);
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      const {errorCallBack} = values;
      toast.error(error.message || "خطای نامشخصی رخ داد");
      errorCallBack?.(error);
    },
  });
};

export default useDeleteCategory;
