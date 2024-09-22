import { useQuery } from "@tanstack/react-query";
import { getVersionAction } from "@actions/version";
import { IVersion } from "@interface/version.interface";

const useGetVersion = (
  repoId: number,
  documentId: number,
  versionId: number | undefined,
  state?: "draft" | "version" | "public",
  innerDocument?: boolean,
  innerOutline?: boolean,
  enabled?: boolean,
) => {
  return useQuery({
    queryKey: [
      `document-${documentId}-version-${versionId}-state-${state}-innerDocument-${!!innerDocument}-innerOutline-${!!innerOutline}`,
    ],
    queryFn: async ({ signal }) => {
      const response = await getVersionAction(
        repoId,
        documentId,
        versionId,
        state,
        innerDocument,
        innerOutline
      );
      return response as IVersion;
    },
    enabled: !!repoId && !!documentId && !!versionId && !!enabled,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};

export default useGetVersion;
