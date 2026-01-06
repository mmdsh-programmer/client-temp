import { useQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { getPublishDocumentInfoAction } from "@actions/publish";
import { IDocumentMetadata } from "@interface/document.interface";

const useGetPublishDocumentInfo = (repoId: number, documentId: number) => {
  return useQuery({
    queryKey: [`get-publish-document-info-repo-${repoId}`],
    queryFn: async ({ signal }) => {
      const response = await getPublishDocumentInfoAction(repoId, documentId, false);
      handleClientSideHookError(response as IActionError);
      return response as IDocumentMetadata;
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!repoId,
  });
};

export default useGetPublishDocumentInfo;
