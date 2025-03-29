import { IActionError } from "@interface/app.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { handleClientSideHookError } from "@utils/error";
import { IVersion, IVersionMetadata } from "@interface/version.interface";
import { getDocumentPublishLinkAction } from "@actions/document";
import { IDocumentMetadata } from "@interface/document.interface";

const useGetDocumentPublishLink = (
  documentId: number,
  getVersions:boolean,
  size: number,
  enabled?: boolean,
) => {
  return useInfiniteQuery({
    queryKey: ["documentPublishLink", documentId],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getDocumentPublishLinkAction(
        documentId,
        getVersions,
        (pageParam - 1) * size,
        size,
      );
      handleClientSideHookError(response as IActionError);
      return (response as IDocumentMetadata).versions as IVersionMetadata;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled,
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

export default useGetDocumentPublishLink;
