import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IActionError } from "@interface/app.interface";
import { ICategory } from "@interface/category.interface";
import { editCategoryAction } from "@actions/category";
import { handleClientSideHookError } from "@utils/error";
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
      handleClientSideHookError(response as IActionError);
      return response as ICategory;
    },
    onSuccess: (response, values) => {
      const { callBack, parentId, currentParentId, repoId } = values;
      queryClient.invalidateQueries({
        queryKey: [`repo-${repoId}-category-${currentParentId || "root"}-children`],
      });

      queryClient.invalidateQueries({
        queryKey: [`repo-${repoId}-category-${parentId || "root"}-children`],
      });

      queryClient.invalidateQueries({
        queryKey: [`repo-${repoId}-category-${currentParentId || "root"}-children-for-move`],
      });

      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useEditCategory;
