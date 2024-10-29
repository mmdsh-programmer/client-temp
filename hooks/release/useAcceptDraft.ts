import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { acceptDraftAction } from "@actions/releaseDocs";

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
