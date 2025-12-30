import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IActionError } from "@interface/app.interface";
import { IDocument } from "@interface/document.interface";
import { handleClientSideHookError } from "@utils/error";
import { toast } from "react-toastify";
import { updateDocumentPasswordAction } from "@actions/document";

const useUpdateDocumentPassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateDocumentPassword"],
    mutationFn: async (values: {
      repoId: number;
      categoryId: number | null;
      documentId: number;
      oldPassword: string | undefined; 
      newPassword: string;
      successCallBack?: (result: IDocument) => void;
      errorCallBack?: () => void;
    }) => {
      const { repoId, documentId, newPassword, oldPassword } = values;
      const response = await updateDocumentPasswordAction(
        repoId,
        documentId,
        oldPassword,
        newPassword,
      );
      handleClientSideHookError(response as IActionError);
      return response as IDocument;
    },
    onSuccess: (response, values) => {
      window.metrics?.track("document:edited_password");

      const { successCallBack, repoId, categoryId } = values;
      queryClient.invalidateQueries({
        queryKey: [`repo-${repoId}-category-${categoryId || "root"}-children`],
      });
      successCallBack?.(response);
    },
    onError: (error, values) => {
      const { errorCallBack } = values;
      toast.error(error.message || "خطای نامشخصی رخ داد");
      errorCallBack?.();
    },
  });
};

export default useUpdateDocumentPassword;
