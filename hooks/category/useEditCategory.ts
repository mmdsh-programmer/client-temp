import { editCategoryAction } from "@actions/category";
import { ICategory } from "@interface/category.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useEditCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editCategory"],
    mutationFn: async (values: {
      repoId: number;
      categoryId: number | null;
      parentId: number | null;
      name: string;
      description: string;
      order: number | null;
      isHidden: boolean;
      callBack?: () => void;
    }) => {
      const { repoId, categoryId, order, isHidden, description, name } = values;
      const response = await editCategoryAction(
        repoId,
        categoryId,
        name,
        description,
        order,
        isHidden
      );
      return response as ICategory;
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

export default useEditCategory;
