import { useQuery } from "@tanstack/react-query";
import { getCategoryAction } from "@actions/category";
import { ICategoryMetadata } from "@interface/category.interface";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetCategory = (
  repoId: number,
  categoryId: number,
  enabled: boolean
) => {
  return useQuery({
    queryKey: [`repo-${repoId}-category-${categoryId}`],
    queryFn: async () => {
      const response = await getCategoryAction(repoId, categoryId);
      handleClientSideHookError(response as IActionError);
      return response as ICategoryMetadata;
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!repoId && !!categoryId && !!enabled,
  });
};

export default useGetCategory;
