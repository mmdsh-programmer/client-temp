import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IActionError } from "@interface/app.interface";
import { bookmarkDocumentAction } from "@actions/document";
import { handleClientSideHookError } from "@utils/error";
import { toast } from "react-toastify";

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
      window.metrics?.track("document:bookmaked");
      const { callBack, repoId, categoryId } = values;
      queryClient.invalidateQueries({
        queryKey: [`repo-${repoId}-category-${categoryId || "root"}-children`],
      });
      queryClient.invalidateQueries({
        queryKey: [
          `repo-${repoId}-category-${categoryId || "root"}-children`,
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
