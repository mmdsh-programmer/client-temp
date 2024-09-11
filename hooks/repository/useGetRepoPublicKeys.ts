import { getRepoKeysAction } from "@actions/repository";
import { IPublicKey, IListResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetRepoPublicKeys = (repoId: number, size: number) => {
  return useInfiniteQuery({
    queryKey: [`repo-${repoId}-public-keys`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getRepoKeysAction(
        repoId,
        (pageParam - 1) * size,
        size,
      );
      return response as IListResponse<IPublicKey>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetRepoPublicKeys;
