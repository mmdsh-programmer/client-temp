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
  enabled?: boolean
) => {
  return useQuery({
    queryKey: [
      `version-${versionId}-state-${state}-innerDocument-${!!innerDocument}-innerOutline-${!!innerOutline}`,
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
    enabled: !!enabled,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetVersion;
