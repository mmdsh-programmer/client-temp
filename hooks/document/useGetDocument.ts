import { useQuery } from "@tanstack/react-query";
import { getClasorFieldAction, getDocumentAction } from "@actions/document";
import { IClasorField, IDocumentMetadata } from "@interface/document.interface";

const useGetDocument = (
  repoId?: number,
  documentId?: number,
  enabled?: boolean
) => {
  return useQuery({
    queryKey: [`document-${documentId}-info`],
    queryFn: async ({ signal }) => {
      const response = await getDocumentAction(repoId, documentId);
      return response?.data as IDocumentMetadata;
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Number.POSITIVE_INFINITY,
  });
};

export default useGetDocument;
