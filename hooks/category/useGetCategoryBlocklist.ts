import { getCategoryBlocklistAction } from "@actions/category";
import { IListResponse } from "@interface/repo.interface";
import { IUser } from "@interface/users.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetCategoryBlocklist = (
  repoId: number,
  categoryId: number,
  size: number
) => {
  return useInfiniteQuery({
    queryKey: [`repo-${repoId}-category-${categoryId}-block-list`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getCategoryBlocklistAction(
        repoId,
        categoryId,
        (pageParam - 1) * size,
        size
      );
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<IUser>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetCategoryBlocklist;
