import { getRepositoryGroupsAction } from "@actions/group";
import { IGetGroups } from "@interface/group.interface";
import { IListResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetGroups = (repoId: number, size: number) => {
  return useInfiniteQuery({
    queryKey: [`getRepoGroups-${repoId}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getRepositoryGroupsAction(
        repoId,
        (pageParam - 1) * size,
        size
      );
      return response as IListResponse<IGetGroups>;
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

export default useGetGroups;
