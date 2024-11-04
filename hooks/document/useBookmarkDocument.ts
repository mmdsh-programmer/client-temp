import { bookmarkDocumentAction } from "@actions/document";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useBookmarkDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["bookmarkDocument"],
    mutationFn: async (values: {
      repoId: number;
      categoryId?: number;
      documentId: number;
      detach?: boolean;
      callBack?: () => void;
    }) => {
      const { detach, repoId, documentId } = values;
      const response = await bookmarkDocumentAction(repoId, documentId, detach);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, categoryId } = values;
      queryClient.invalidateQueries({
        queryKey: [`category-${categoryId || "parent"}-children`],
      });
      queryClient.invalidateQueries({
        queryKey: [
          `repo-${repoId}-category-${categoryId || "parent"}-children`,
          undefined,
        ],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useBookmarkDocument;
