import { IContentSearchListItem } from "@interface/contentSearch.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { searchPublishContentAction } from "@actions/publish";
import { IListResponse } from "@interface/repo.interface";

const useSearchPublishContent = (
  repoId: number | undefined,
  searchText: string,
  size: number
) => {
  return useInfiniteQuery({
    queryKey: [`${repoId ? `repoId-${repoId}-` : ""}searchContent-${searchText}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await searchPublishContentAction(
        repoId,
        searchText,
        (pageParam - 1) * size,
        size
      );

      handleClientSideHookError(response as IActionError);
      return response as IListResponse<IContentSearchListItem>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!searchText,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useSearchPublishContent;
