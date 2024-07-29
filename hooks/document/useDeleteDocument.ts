import { deleteCategoryAction } from "@actions/category";
import { deleteDocumentAction } from "@actions/document";
import { deleteRepoAction } from "@actions/repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteDocument"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      parentId: number | null;
      callBack?: () => void;
    }) => {
      const { repoId, documentId } = values;
      const response = await deleteDocumentAction(repoId, documentId);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, parentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`category-${parentId || "parent"}-children`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeleteDocument;
