import { useQuery } from "@tanstack/react-query";
import { getPublishDocumentCustomPostAction } from "@actions/customPost";
import { handleClientSideHookError } from "@utils/error";
import { IActionError } from "@interface/app.interface";

const useGetPublishDocumentCustomPost = (documentId: number) => {
  return useQuery({
    queryKey: [`document-${documentId}-custom-post`],
    queryFn: async () => {
      const response = await getPublishDocumentCustomPostAction(documentId);
      handleClientSideHookError(response as IActionError);
      return (response as { content: string }).content;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetPublishDocumentCustomPost;
