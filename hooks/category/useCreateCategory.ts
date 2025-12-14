import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { ICategory } from "@interface/category.interface";
import { createCategoryAction } from "@actions/category";
import { handleClientSideHookError } from "@utils/error";
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
      onSuccessHandler?: () => void;
    }) => {
      const { repoId, parentId, order, description, name } = values;
      const response = await createCategoryAction(repoId, parentId, name, description, order);
      handleClientSideHookError(response as IActionError);
      return response as ICategory;
    },
    onSuccess: async (response, values) => {
      window.metrics?.track("category:created");

      const { onSuccessHandler, parentId, order, repoId } = values;
      const queryKey = [`repo-${repoId}-category-${parentId || "root"}-children`];
      const cachedData = await queryClient.getQueriesData({ queryKey });
      const cachePages = cachedData?.[0]?.[1] as {
        pages: { list: ICategory[]; offset: number; size: number; total: number }[];
      };

      if (cachePages) {
        const newCategory = {
          ...response,
          createdAt: `${+new Date()}`,
          updatedAt: null,
          type: "category",
          newOne: true,
          repoId: values.repoId,
          order,
        };

        const newData = {
          ...cachePages,
          pages: cachePages.pages.map((page, index) => {
            return index === 0
              ? { ...{ ...page, total: page.total + 1 }, list: [newCategory, ...page.list] }
              : page;
          }),
        };

        queryClient.setQueriesData({ queryKey }, newData);
      }
      onSuccessHandler?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreateCategory;
