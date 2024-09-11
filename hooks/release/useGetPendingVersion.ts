import { getPendingVersionAction } from "@actions/releaseDocs";
import { IListResponse } from "@interface/repo.interface";
import { IVersion } from "@interface/version.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetPendingVersion = (repoId: number, size: number) => {
  return useInfiniteQuery({
    queryKey: [`pending-version-${repoId}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getPendingVersionAction(
        repoId,
        (pageParam - 1) * size,
        size,
      );
      return response as IListResponse<IVersion>;
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

export default useGetPendingVersion;
