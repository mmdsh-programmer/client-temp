import { useQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { getPublishDocumentLastVersionAction } from "@actions/publish";
import { IVersion } from "@interface/version.interface";

const useGetPublishLastVersion = (repoId: number, documentId: number, password?: string) => {
  return useQuery({
    queryKey: [`get-last-version-repo-${repoId}`],
    queryFn: async ({ signal }) => {
      const response = await getPublishDocumentLastVersionAction(repoId, documentId, password);
      handleClientSideHookError(response as IActionError);
      return response as IVersion;
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!repoId,
  });
};

export default useGetPublishLastVersion;
