import {
    updateDocumentPasswordAction,
  } from "@actions/document";
  import { IDocument } from "@interface/document.interface";
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { toast } from "react-toastify";
  
  const useUpdateDocumentPassword = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["updateDocumentPassword"],
      mutationFn: async (values: {
        repoId: number;
        categoryId: number | null;
        documentId: number;
        oldPassword: string;
        newPassword: string
        successCallBack?: (result: IDocument) => void;
        errorCallBack?: () => void;
      }) => {
        const { repoId, documentId, newPassword, oldPassword } = values;
        const response = await updateDocumentPasswordAction(
          repoId,
          documentId,
          oldPassword,
          newPassword
        );
        return response as IDocument;
      },
      onSuccess: (response, values) => {
        const { successCallBack, categoryId } = values;
        queryClient.invalidateQueries({
          queryKey: [`category-${categoryId || "parent"}-children`],
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
  