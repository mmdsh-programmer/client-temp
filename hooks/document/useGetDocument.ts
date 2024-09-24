import { useQuery } from "@tanstack/react-query";
import { getDocumentAction } from "@actions/document";
import { IDocumentMetadata } from "@interface/document.interface";

const useGetDocument = (
  repoId: number,
  documentId: number,
  enabled?: boolean,
) => {
  return useQuery({
    queryKey: [`document-${documentId}-info`],
    queryFn: async ({ signal }) => {
      const response = await getDocumentAction(repoId, documentId);
      return response as IDocumentMetadata;
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!repoId && !!documentId && !!enabled,
  });
};

export default useGetDocument;
