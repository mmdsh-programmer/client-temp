import { getRepositoryInviteRequestsAction } from "@actions/users";
import { IAccessRequest } from "@interface/accessRequest.interface";
import { IListResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetInviteRequestsByOwner = (
  repoId: number,
  size: number,
) => {
  return useInfiniteQuery({
    queryKey: [`getRepoInviteRequestsByOwner-${repoId}`],
    queryFn: async ({ pageParam }) => {
      const response = await getRepositoryInviteRequestsAction(
        repoId,
        (pageParam - 1) * size,
        size,
      );
      return response as IListResponse<IAccessRequest>;
    },
    initialPageParam: 1,
    retry: false,
    enabled: !!repoId,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetInviteRequestsByOwner;
