import { useQuery } from "@tanstack/react-query";
import { getLastVersionAction } from "@actions/version";
import { IVersion } from "@interface/version.interface";

const useGetLastVersion = (
  repoId: number,
  documentId: number,
) => {
  return useQuery({
    queryKey: [`get-last-version-document-${documentId}`],
    queryFn: async ({ signal }) => {
      const response = await getLastVersionAction(repoId, documentId);
      return response as IVersion;
    },
    enabled: !!documentId && !!repoId,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Number.POSITIVE_INFINITY,
  });
};

export default useGetLastVersion;
