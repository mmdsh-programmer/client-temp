import { useQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { IDocumentSocialInfoResponse } from "@interface/document.interface";
import { getDocumentSocialInfoAction } from "@actions/document";

const useGetDocumentSocial = (repoId: number, documentId: number) => {
  return useQuery({
    queryKey: [`get-document-social-documentId-${documentId}`],
    queryFn: async ({ signal }) => {
      const response = await getDocumentSocialInfoAction(repoId, documentId);
      handleClientSideHookError(response as IActionError);
      return response as IDocumentSocialInfoResponse;
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!repoId && !!documentId,
  });
};

export default useGetDocumentSocial;
