import { IActionError } from "@interface/app.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { handleClientSideHookError } from "@utils/error";
import { getPublishDocumentVersionsAction } from "@actions/publish";
import { IListResponse } from "@interface/repo.interface";
import { IVersion } from "@interface/version.interface";

const useGetPublishDocumentVersions = (
  repoId: number,
  documentId: number,
  size: number,
  enabled?: boolean,
) => {
  return useInfiniteQuery({
    queryKey: [`${documentId}-public-versions`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getPublishDocumentVersionsAction(
        repoId,
        documentId,
        (pageParam - 1) * size,
        size,
      );
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<IVersion>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetPublishDocumentVersions;
