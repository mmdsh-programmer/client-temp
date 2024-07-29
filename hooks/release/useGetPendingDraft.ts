import { getPendingDraftsAction } from "@actions/releaseDocs";
import { IVersion } from "@interface/version.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetPendingDraft = (repoId: number | undefined, size: number) => {
  return useInfiniteQuery({
    queryKey: [`pending-draft-${repoId}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getPendingDraftsAction(
        repoId,
        (pageParam - 1) * size,
        size
      );
      return response?.data as {
        list: IVersion[];
        total: number;
        offset: number;
        size: number;
      };
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!repoId,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetPendingDraft;
