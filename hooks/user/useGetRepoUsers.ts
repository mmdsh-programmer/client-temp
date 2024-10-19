import { getRepositoryUserList } from "@actions/users";
import { IListResponse } from "@interface/repo.interface";
import { IUser } from "@interface/users.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetRepoUsers = (repoId: number, size: number, enabled: boolean) => {
  return useInfiniteQuery({
    queryKey: [`getRepoUsers-${repoId}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getRepositoryUserList(
        repoId,
        (pageParam - 1) * size,
        size,
      );
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<IUser>;
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

export default useGetRepoUsers;
