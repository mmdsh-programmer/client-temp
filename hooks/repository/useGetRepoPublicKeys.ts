import { getRepoKeysAction } from "@actions/repository";
import { IPublicKey, IListResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetRepoPublicKeys = (repoId: number, size: number) => {
  return useInfiniteQuery({
    queryKey: [`repo-${repoId}-public-keys`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getRepoKeysAction(
        repoId,
        (pageParam - 1) * size,
        size,
      );
      handleClientSideHookError(response as IActionError);
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
