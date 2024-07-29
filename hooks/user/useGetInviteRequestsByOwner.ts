import { getRepositoryInviteRequestsAction } from "@actions/users";
import { IAccessRequestResponse } from "@interface/accessRequest.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetInviteRequestsByOwner = (repoId: number | undefined, size: number, enabled: boolean) => {
  return useInfiniteQuery({
    queryKey: [`getRepoInviteRequestsByOwner-${repoId}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getRepositoryInviteRequestsAction(
        repoId,
        (pageParam - 1) * size,
        size
      );
      return response?.data as IAccessRequestResponse;
    },
    initialPageParam: 1,
    retry: false,
    enabled: !!repoId && !!enabled,
    refetchOnWindowFocus: false, 
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetInviteRequestsByOwner;
