import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IActionError } from "@interface/app.interface";
import { acceptDraftAction } from "@actions/releaseDocs";
import { handleClientSideHookError } from "@utils/error";
import { toast } from "react-toastify";

const useAcceptDraft = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["acceptDraft"],
    mutationFn: async (values: {
      repoId: number;
      docId: number;
      draftId: number;
      isDirectAccess?: boolean;
      callBack?: () => void;
    }) => {
      const { repoId, docId, draftId, isDirectAccess } = values;
      const response = await acceptDraftAction(repoId, docId, draftId, isDirectAccess);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, docId } = values;
      queryClient.invalidateQueries({
        queryKey: [`pending-draft-${repoId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`version-list-${repoId}-${docId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useAcceptDraft;
