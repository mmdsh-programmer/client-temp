import { useQuery } from "@tanstack/react-query";
import { getVersionAction } from "@actions/version";
import { IVersion } from "@interface/version.interface";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

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
        innerOutline,
      );
      handleClientSideHookError(response as IActionError);
      return response as IVersion;
    },
    enabled: !!repoId && !!documentId && !!versionId && !!enabled,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};

export default useGetVersion;
