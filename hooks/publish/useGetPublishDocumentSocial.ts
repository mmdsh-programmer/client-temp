import { useQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { getPublishDocumentSocialInfoAction } from "@actions/publish";
import { IDocumentSocialInfoResponse } from "@interface/document.interface";

const useGetPublishDocumentSocial = (documentId: number) => {
  return useQuery({
    queryKey: [`get-publish-document-social-documentId-${documentId}`],
    queryFn: async ({ signal }) => {
      const response = await getPublishDocumentSocialInfoAction(documentId);
      handleClientSideHookError(response as IActionError);
      return response as IDocumentSocialInfoResponse;
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!documentId,
  });
};

export default useGetPublishDocumentSocial;
