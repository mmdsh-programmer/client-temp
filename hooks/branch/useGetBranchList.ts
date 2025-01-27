import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllBranchListAction } from "@actions/branch";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetBranchList = (
  parentId: number | undefined,
  ownerSSOID: number | undefined,
  size: number,
) => {
  return useInfiniteQuery({
    queryKey: [`branches-${parentId}-${ownerSSOID}`],
    queryFn: async ({ pageParam }) => {
      const response = await getAllBranchListAction(
        parentId,
        ownerSSOID,
        (pageParam - 1) * size,
        size
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
    enabled: !!parentId || !!ownerSSOID,
  });
};

export default useGetBranchList;
