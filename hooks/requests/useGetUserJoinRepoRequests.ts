import { getUserToRepoRequestsAction } from "@actions/requests";
import { IAccessRequestResponse } from "@interface/accessRequest.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetUserJoinRepoRequests = (size: number) => {
  return useInfiniteQuery({
    queryKey: [`userJoinRepoRequests`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getUserToRepoRequestsAction(
        (pageParam - 1) * size,
        size,
      );
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
