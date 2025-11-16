import { useQuery } from "@tanstack/react-query";
import { getVersionInfoAction } from "@actions/version";
import { IContentVersion } from "@interface/version.interface";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetVersionInfo = (
  repoId: number,
  documentId: number,
  versionId: number,
  versionIndex: number,
  transaction?: boolean,
  enabled?: boolean,
) => {
  return useQuery({
    queryKey: [`document-${documentId}-version-${versionId}-info`],
    queryFn: async () => {
      const response = await getVersionInfoAction(
        repoId,
        documentId,
        versionId,
        versionIndex,
        transaction,
      );
      handleClientSideHookError(response as IActionError);
      return response as IContentVersion;
    },
    enabled: !!repoId && !!documentId && !!versionId && !!versionIndex,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
    gcTime: 0,
  });
};

export default useGetVersionInfo;
