import { useQuery } from "@tanstack/react-query";
import { getDocumentAction } from "@actions/document";
import { IDocumentMetadata } from "@interface/document.interface";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetDocument = (
  repoId: number,
  documentId: number,
  enabled?: boolean,
  disableVersions?: boolean,
  onQueryComplete?: (data: IDocumentMetadata) => void,
) => {
  return useQuery({
    queryKey: [`document-${documentId}-info`],
    queryFn: async ({ signal }) => {
      const response = await getDocumentAction(
        repoId,
        documentId,
        undefined,
        undefined,
        disableVersions
      );
      handleClientSideHookError(response as IActionError);
      onQueryComplete?.(response as IDocumentMetadata);
      return response as IDocumentMetadata;
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!repoId && !!documentId && !!enabled,
  });
};

export default useGetDocument;
