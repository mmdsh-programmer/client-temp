import { deleteDocumentPasswordAction } from "@actions/document";
import { IDocument } from "@interface/document.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

export default useDeleteDocumentPassword;
