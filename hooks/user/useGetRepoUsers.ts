import { getRepositoryUserList } from "@actions/users";
import { IListResponse } from "@interface/repo.interface";
import { IUser } from "@interface/users.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetRepoUsers = (repoId: number, size: number, enabled: boolean) => {
  return useInfiniteQuery({
    queryKey: [`getRepoUsers-${repoId}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getRepositoryUserList(
        repoId,
        (pageParam - 1) * size,
        size,
      );
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
