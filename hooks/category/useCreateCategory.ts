import { createCategoryAction } from "@actions/category";
import { ICategory } from "@interface/category.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createCategory"],
    mutationFn: async (values: {
      repoId: number;
      parentId: number | null;
      name: string;
      description: string;
      order: number | null;
      callBack?: () => void;
    }) => {
      const { repoId, parentId, order, description, name } = values;
      const response = await createCategoryAction(
        repoId,
        parentId,
        name,
        description,
        order
      );
      return response as ICategory;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      console.log("--------------- response ----------------", response);
      queryClient.invalidateQueries({
        queryKey: [`category-${response.parentId || "parent"}-children`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreateCategory;
