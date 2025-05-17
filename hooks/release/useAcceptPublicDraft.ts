import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IActionError } from "@interface/app.interface";
import { acceptPublicDraftAction } from "@actions/releaseDocs";
import { handleClientSideHookError } from "@utils/error";
import { toast } from "react-toastify";

const useAcceptPublicDraft = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["acceptPublicDraft"],
    mutationFn: async (values: {
      repoId: number;
      docId: number;
      draftId: number;
      callBack?: () => void;
    }) => {
      const { repoId, docId, draftId } = values;
      const response = await acceptPublicDraftAction(repoId, docId, draftId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, docId} = values;
      queryClient.invalidateQueries({
        queryKey: [`pending-version-${repoId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`repo-${repoId}-document-${docId}`],
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

export default useAcceptPublicDraft;
