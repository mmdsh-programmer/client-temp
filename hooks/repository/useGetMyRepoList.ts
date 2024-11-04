import { getMyRepositoryList } from "@actions/repository";
import { IRepo, IListResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetMyRepoList = (
  size: number,
  archived: boolean,
  name?: string,
  isPublished?: boolean,
  enabled?: boolean,
) => {
  return useInfiniteQuery({
    queryKey: [`myRepoList-${archived}${name ? `-${name}` : ""}${isPublished ? "-isPublished" : ""}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getMyRepositoryList(
        (pageParam - 1) * size,
        size,
        archived,
        name,
        isPublished
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

export default useGetMyRepoList;
