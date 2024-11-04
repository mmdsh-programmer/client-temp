import { IAccessRequestResponse } from "@interface/accessRequest.interface";
import { getUserToRepoRequestsAction } from "@actions/requests";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetUserJoinRepoRequests = (size: number) => {
  return useInfiniteQuery({
    queryKey: ["userJoinRepoRequests"],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getUserToRepoRequestsAction(
        (pageParam - 1) * size,
        size,
      );
      handleClientSideHookError(response as IActionError);
      return response as IAccessRequestResponse;
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

export default useGetUserJoinRepoRequests;
