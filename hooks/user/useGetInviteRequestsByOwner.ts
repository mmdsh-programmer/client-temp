import { getRepositoryInviteRequestsAction } from "@actions/users";
import { IAccessRequest } from "@interface/accessRequest.interface";
import { IListResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetInviteRequestsByOwner = (
  repoId: number,
  size: number,
  enabled?: boolean,
) => {
  return useInfiniteQuery({
    queryKey: [`getRepoInviteRequestsByOwner-${repoId}`, repoId],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getRepositoryInviteRequestsAction(
        repoId,
        (pageParam - 1) * size,
        size,
      );
      return response as IListResponse<IAccessRequest>;
    },
    initialPageParam: 1,
    retry: false,
    enabled: !!(repoId && !Number.isNaN(repoId)),
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetInviteRequestsByOwner;
