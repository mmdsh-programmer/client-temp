import { getRepositoryTagAction } from "@actions/tag";
import { IListResponse } from "@interface/repo.interface";
import { ITag } from "@interface/tags.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetTags = (repoId: number, size: number, enabled?: boolean) => {
  return useInfiniteQuery({
    queryKey: [`getTags-${repoId}`, size],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getRepositoryTagAction(
        repoId,
        (pageParam - 1) * size,
        size,
      );
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<ITag>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!repoId && !!enabled,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetTags;
