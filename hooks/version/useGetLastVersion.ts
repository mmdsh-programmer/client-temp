import { useQuery } from "@tanstack/react-query";
import { getLastVersionAction } from "@actions/version";
import { IVersion } from "@interface/version.interface";

const useGetLastVersion = (
  repoId: number,
  documentId: number,
  enabled?: boolean
) => {
  return useQuery({
    queryKey: [`get-last-version-document-${documentId}-repo-${repoId}`],
    queryFn: async ({ signal }) => {
      const response = await getLastVersionAction(repoId, documentId);
      return response as IVersion;
    },
    enabled: !!documentId && !!repoId,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetLastVersion;
