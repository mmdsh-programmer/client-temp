import { useQuery } from "@tanstack/react-query";
import { getFormVersionExportAction } from "@actions/version";
import { IVersion } from "@interface/version.interface";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetFormVersionExport = (
  repoId: number,
  documentId: number,
  versionId: number,
  fileType: "XLSX" | "CSV",
  enabled?: boolean
) => {
  return useQuery({
    queryKey: [`get-form-version-export-document-${documentId}-repo-${repoId}`],
    queryFn: async ({ signal }) => {
      const response = await getFormVersionExportAction(repoId, documentId, versionId, fileType);
      handleClientSideHookError(response as IActionError);
      return response as IVersion;
    },
    enabled: !!documentId && !!repoId && !!enabled,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetFormVersionExport;
