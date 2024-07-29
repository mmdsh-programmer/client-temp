
import { getContentAction } from "@actions/content";
import { IContentSearchResult } from "@interface/contentSearch.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useSearchContent = (
    repoId: number | undefined,
    searchParam: string,
    size: number,
) => {
  return useInfiniteQuery({
    queryKey: [`repoId-${repoId}-searchContent-${searchParam}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getContentAction(
        repoId,
        searchParam,
        (pageParam - 1) * size,
        size,
      );

      console.log("----------------------- response ------------------", response)
      return response?.data as IContentSearchResult;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!repoId && !!searchParam,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useSearchContent;
