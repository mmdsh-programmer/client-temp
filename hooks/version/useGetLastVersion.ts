import { useQuery } from "@tanstack/react-query";
import { getLastVersionAction } from "@actions/version";
import { IVersion } from "@interface/version.interface";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetLastVersion = (
  repoId: number,
  documentId: number,
  isDirectAccess?: boolean,
  enabled?: boolean
) => {
  return useQuery({
    queryKey: [`get-last-version-document-${documentId}-repo-${repoId}`],
    queryFn: async ({ signal }) => {
      const response = await getLastVersionAction(repoId, documentId, isDirectAccess);
      handleClientSideHookError(response as IActionError);
      return response as IVersion;
    },
    enabled:  !!enabled && !!repoId,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetLastVersion;
