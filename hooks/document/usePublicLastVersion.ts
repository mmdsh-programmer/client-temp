import { publicLastVersionAction } from "@actions/document";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const usePublicLastVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["public-last-version"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      isDirectAccess?: boolean;
      draftId?: number;
      callBack?: () => void;
    }) => {
      const { isDirectAccess, repoId, documentId, draftId } = values;
      const response = await publicLastVersionAction(repoId, documentId, isDirectAccess, draftId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      window.metrics?.track("document:make_public_last_version");

      const { callBack, repoId, documentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`repo-${repoId}-document-${documentId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`version-list-${repoId}-${documentId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default usePublicLastVersion;
