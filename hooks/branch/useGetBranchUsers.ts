import { useInfiniteQuery } from "@tanstack/react-query";
import { getBranchUsersAction } from "@actions/branch";
import { handleClientSideHookError } from "@utils/error";
import { IActionError } from "@interface/app.interface";
import { IBranchUserList } from "@interface/branch.interface";

const useGetBranchUsers = (branchId: number, size: number) => {
  return useInfiniteQuery({
    queryKey: [`branch-users-${branchId}`],
    queryFn: async ({ pageParam }) => {
      const response = await getBranchUsersAction(
        branchId,
        (pageParam - 1) * size,
        size,
      );
      handleClientSideHookError(response as IActionError);
      return response as IBranchUserList;
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

export default useGetBranchUsers; 