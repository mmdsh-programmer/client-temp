import { getRepositoryTagAction } from "@actions/tag";
import { ITags } from "@interface/tags.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetTags = (repoId: number | undefined, size: number, enabled?: boolean) => {
  return useInfiniteQuery({
    queryKey: [`getTags-${repoId}-${size}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getRepositoryTagAction(
        repoId,
        (pageParam - 1) * size,
        size,
      );
      return response?.data as ITags;
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

export default useGetTags;
