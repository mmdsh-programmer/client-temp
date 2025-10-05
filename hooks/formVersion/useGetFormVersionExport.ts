import { useQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { getFormVersionExportAction } from "@actions/podForm";

const useGetFormVersionExport = (
  repoId: number,
  documentId: number,
  versionId: number,
  fileType: "XLSX" | "CSV",
  enabled?: boolean,
) => {
  return useQuery({
    queryKey: [`get-form-version-export-repoId-${repoId}-document-${documentId}-version-${versionId}`],
    queryFn: async ({ signal }) => {
      const response = await getFormVersionExportAction(repoId, documentId, versionId, fileType);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    enabled: !!documentId && !!repoId && !!versionId && !!enabled,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetFormVersionExport;
