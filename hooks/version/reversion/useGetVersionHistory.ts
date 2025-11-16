import { useQuery } from "@tanstack/react-query";
import { getVersionHistoryAction } from "@actions/version";
import { IContentVersionData } from "@interface/version.interface";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetVersionHistory = (
  repoId: number,
  documentId: number,
  versionId: number,
  transaction?: boolean,
  enabled?: boolean,
) => {
  return useQuery({
    queryKey: [`document-${documentId}-version-${versionId}-history`],
    queryFn: async () => {
      const response = await getVersionHistoryAction(repoId, documentId, versionId, transaction);
      handleClientSideHookError(response as IActionError);
      return response as IContentVersionData;
    },
    enabled: !!repoId && !!documentId && !!versionId,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
    gcTime: 0,
  });
};

export default useGetVersionHistory;
