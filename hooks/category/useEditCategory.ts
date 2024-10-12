import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICategory } from "@interface/category.interface";
import { editCategoryAction } from "@actions/category";
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
      description: string | undefined;
      order: number | null;
      isHidden: boolean;
      currentParentId: number | null;
      callBack?: () => void;
    }) => {
      const {
        repoId,
        parentId,
        categoryId,
        order,
        isHidden,
        description,
        name,
      } = values;
      const response = await editCategoryAction(
        repoId,
        categoryId,
        parentId,
        name,
        description,
        order,
        isHidden
      );
      return response as ICategory;
    },
    onSuccess: (response, values) => {
      const { callBack, parentId, currentParentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`category-${currentParentId || "parent"}-children`],
      });

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
