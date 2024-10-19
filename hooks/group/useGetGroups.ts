import { getRepositoryGroupsAction } from "@actions/group";
import { IGetGroups } from "@interface/group.interface";
import { IListResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetGroups = (repoId: number, size: number) => {
  return useInfiniteQuery({
    queryKey: [`getRepoGroups-${repoId}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getRepositoryGroupsAction(
        repoId,
        (pageParam - 1) * size,
        size,
      );
      handleClientSideHookError(response as IActionError);
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
