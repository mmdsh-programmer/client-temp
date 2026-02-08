import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { rejectDraftAction } from "@actions/releaseDocs";

const useRejectDraft = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["rejectDraft"],
    mutationFn: async (values: {
      repoId: number;
      docId: number;
      draftId: number;
      isDirectAccess?: boolean;
      callBack?: () => void;
    }) => {
      const { repoId, docId, draftId, isDirectAccess } = values;
      const response = await rejectDraftAction(repoId, docId, draftId, isDirectAccess);
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

export default useRejectDraft;
