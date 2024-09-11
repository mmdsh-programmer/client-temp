import { deleteCategoryAction } from "@actions/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeleteCategory;
