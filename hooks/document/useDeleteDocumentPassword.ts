import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IActionError } from "@interface/app.interface";
import { IDocument } from "@interface/document.interface";
import { deleteDocumentPasswordAction } from "@actions/document";
import { handleClientSideHookError } from "@utils/error";
import { toast } from "react-toastify";

const useDeleteDocumentPassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteDocumentPassword"],
    mutationFn: async (values: {
      repoId: number;
      categoryId: number | null;
      documentId: number;
      password: string;
      successCallBack?: (result: IDocument) => void;
      errorCallBack?: () => void;
    }) => {
      const { repoId, documentId, password } = values;
      const response = await deleteDocumentPasswordAction(
        repoId,
        documentId,
        password,
      );
      handleClientSideHookError(response as IActionError);
      return response as IDocument;
    },
    onSuccess: (response, values) => {
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

export default useDeleteDocumentPassword;
