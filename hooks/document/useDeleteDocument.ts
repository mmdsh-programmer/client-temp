import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IActionError } from "@interface/app.interface";
import { deleteDocumentAction } from "@actions/document";
import { handleClientSideHookError } from "@utils/error";
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
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, parentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`category-${parentId || "root"}-children`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeleteDocument;
