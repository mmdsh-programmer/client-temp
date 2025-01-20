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
      callBack?: () => void;
    }) => {
      const { repoId, docId, draftId } = values;
      debugger;
      const response = await acceptDraftAction(repoId, docId, draftId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({
        queryKey: [`pending-draft-${repoId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useAcceptDraft;
