import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { IDocumentMetadata } from "@interface/document.interface";
import { getPublishDocumentInfoAction } from "@actions/publish";

const useCreateDocumentLink = () => {
  return useMutation({
    mutationKey: ["create-document-link"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      callBack?: (data: IDocumentMetadata) => void;
      errorCallback?: () => void;
    }) => {
      const { repoId, documentId } = values;
      const response = await getPublishDocumentInfoAction(repoId, documentId, false);
      handleClientSideHookError(response as IActionError);
      return response as IDocumentMetadata;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      callBack?.(response);
    },
    onError: (error, values) => {
      const { errorCallback } = values;
      errorCallback?.();
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreateDocumentLink;
