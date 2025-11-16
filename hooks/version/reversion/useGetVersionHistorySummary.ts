import { useQuery } from "@tanstack/react-query";
import { getVersionSummaryAction } from "@actions/version";
import { IVersionsSummary } from "@interface/version.interface";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetVersionSummary = (
  repoId: number,
  documentId: number,
  versionId: number,
  transaction?: boolean,
  enabled?: boolean,
) => {
  return useQuery({
    queryKey: [`document-${documentId}-version-${versionId}-summary`],
    queryFn: async () => {
      const response = await getVersionSummaryAction(repoId, documentId, versionId, transaction);
      handleClientSideHookError(response as IActionError);
      return response as IVersionsSummary;
    },
    enabled: !!repoId && !!documentId && !!versionId && !!enabled,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
    gcTime: 0,
  });
};

export default useGetVersionSummary;
