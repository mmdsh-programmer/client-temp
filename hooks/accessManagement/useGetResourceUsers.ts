/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { getUsersOfResourceAction } from "@actions/accessManagement";

const useGetResourceUsers = (resourceId: number, size: number) => {
  return useInfiniteQuery({
    queryKey: [`get-resource:${resourceId}-users`],
    queryFn: async ({ pageParam }) => {
      const response = await getUsersOfResourceAction(
        resourceId,
        (pageParam - 1) * size,
        size
      );
      handleClientSideHookError(response as IActionError);
      return response as any;
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

export default useGetResourceUsers;
