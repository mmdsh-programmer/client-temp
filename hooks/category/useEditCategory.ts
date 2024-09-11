import { editCategoryAction } from "@actions/category";
import { categoryShow } from "@atom/category";
import { ICategory } from "@interface/category.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

const useEditCategory = (move?: boolean) => {
  const queryClient = useQueryClient();
  const getCategoryShow = useRecoilValue(categoryShow);

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
        isHidden,
      );
      return response as ICategory;
    },
    onSuccess: (response, values) => {
      const { callBack, parentId } = values;

      queryClient.invalidateQueries({
        queryKey: [`category-${parentId || "parent"}-children`, undefined],
      });
      queryClient.invalidateQueries({
        queryKey: [
          `category-${getCategoryShow?.id || "parent"}-children`,
          undefined,
        ],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useEditCategory;
