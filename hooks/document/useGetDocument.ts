import { useQuery } from "@tanstack/react-query";
import { getDocumentAction } from "@actions/document";
import { IDocumentMetadata } from "@interface/document.interface";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetDocument = (
  repoId: number,
  documentId?: number,
  isDirectAccess?: boolean,
  enabled?: boolean,
  disableVersions?: boolean,
  queryKey?: string,
) => {
  return useQuery({
    queryKey: [queryKey ?? `document-${documentId}-info`],
    queryFn: async ({ signal }) => {
      if (documentId) {
        const response = await getDocumentAction(
          repoId,
          documentId,
          isDirectAccess, // isDirectAccess
          undefined,
          undefined,
          disableVersions,
        );
        handleClientSideHookError(response as IActionError);
        return response as IDocumentMetadata;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!enabled && !!repoId && !!documentId,
  });
};

export default useGetDocument;
