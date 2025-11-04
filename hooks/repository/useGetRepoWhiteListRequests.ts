import { IListResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { IDocumentWhiteListRequest } from "@interface/document.interface";
import { getRepoWhiteListRequestAction } from "@actions/repository";

const useGetRepoWhiteListRequests = (repoId: number, size: number) => {
  return useInfiniteQuery({
    queryKey: [`repo-${repoId}-white-list-requests`, undefined],
    queryFn: async ({ pageParam }) => {
      const response = await getRepoWhiteListRequestAction(
        repoId,
        (pageParam - 1) * size,
        size,
      );
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<IDocumentWhiteListRequest>;
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

export default useGetRepoWhiteListRequests;
