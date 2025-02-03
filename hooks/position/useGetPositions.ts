import { useInfiniteQuery } from "@tanstack/react-query";
import { getPositionListAction } from "@actions/position";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetPositions = (branchId: number, size: number) => {
  return useInfiniteQuery({
    queryKey: [`positions-${branchId}`],
    queryFn: async ({ pageParam }) => {
      const response = await getPositionListAction(
        branchId,
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
    enabled: !!branchId,
  });
};

export default useGetPositions;
