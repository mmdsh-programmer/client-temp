import { getRepositoryGroupsAction } from "@actions/group";
import { IGroupResult } from "@interface/group.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetGroups = (repoId: number | undefined, size: number) => {
  return useInfiniteQuery({
    queryKey: [`getRepoGroups-${repoId}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getRepositoryGroupsAction(
        repoId,
        (pageParam - 1) * size,
        size
      );
      return response?.data as IGroupResult;
    },
    initialPageParam: 1,
    retry: false,
    enabled: !!repoId,
    refetchOnWindowFocus: false, 
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetGroups;
