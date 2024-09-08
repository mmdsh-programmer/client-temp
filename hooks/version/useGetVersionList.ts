import { useInfiniteQuery } from "@tanstack/react-query";
import { getDocumentAction } from "@actions/document";
import { IVersionMetadata } from "@interface/document.interface";
import { IVersion } from "@interface/version.interface";

const useGetVersionList = (
  repoId: number,
  documentId: number,
  size: number
) => {
  return useInfiniteQuery({
    queryKey: [`version-list-${repoId}-${documentId}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getDocumentAction(
        repoId,
        documentId,
        (pageParam - 1) * size,
        size
      );
      return response?.versions as IVersionMetadata;
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
