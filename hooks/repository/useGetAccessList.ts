import { getAccessRepositoryList } from "@actions/repository";
import { IRepo, IListResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetAccessList = (size: number, name?: string, enabled?: boolean) => {
  return useInfiniteQuery({
    queryKey: [`accessRepoList${name ? `-${name}` : ""}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getAccessRepositoryList(
        (pageParam - 1) * size,
        size,
        name,
      );
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<IRepo>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!enabled,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetAccessList;
