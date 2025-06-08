import { useQuery } from "@tanstack/react-query";
import { getDocumentCustomPostAction } from "@actions/customPost";
import { handleClientSideHookError } from "@utils/error";
import { IActionError } from "@interface/app.interface";

const useGetDocumentCustomPost = (repoId: number, documentId: number) => {
  return useQuery({
    queryKey: [`document-${documentId}-custom-post`],
    queryFn: async () => {
      const response = await getDocumentCustomPostAction(
        repoId,
        documentId,
      );
      handleClientSideHookError(response as IActionError);
      return (response as {content: string}).content;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetDocumentCustomPost;
