import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { updateDocumentCustomPostAction } from "@actions/customPost";
import { ISeo } from "@interface/social.interface";

const useUpdateDocumentCustomPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-document-custom-post"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      content: ISeo;
      callBack?: () => void;
    }) => {
      const { repoId, documentId, content } = values;
      const response = await updateDocumentCustomPostAction(repoId, documentId, content);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, documentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`document-${documentId}-custom-post`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useUpdateDocumentCustomPost;
