import { useInfiniteQuery } from "@tanstack/react-query";
import { getDocumentAction } from "@actions/document";
import { IVersion, IVersionMetadata } from "@interface/version.interface";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { IDocumentMetadata } from "@interface/document.interface";

const useGetVersionList = (
  repoId: number,
  documentId: number,
  size: number
) => {
  return useInfiniteQuery({
    queryKey: [`version-list-${repoId}-${documentId}`],
    queryFn: async ({ pageParam }) => {
      const response = await getDocumentAction(
        repoId,
        documentId,
        (pageParam - 1) * size,
        size
      );
      handleClientSideHookError(response as IActionError);
      return (response as IDocumentMetadata).versions as IVersionMetadata;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!repoId && !!documentId,
    getNextPageParam: (
      lastPage:
        | {
            list: IVersion[];
            total: number;
            offset: number;
            size: number;
          }
        | undefined,
      pages
    ) => {
      if (pages.length < Math.ceil(lastPage!.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetVersionList;
