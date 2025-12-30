import { setLastVersionAction } from "@actions/version";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useSetLastVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-last-version"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      versionId: number;
      isDirectAccess?: boolean;
      callBack?: () => void;
    }) => {
      const { repoId, documentId, versionId, isDirectAccess } = values;
      const response = await setLastVersionAction(
        repoId,
        documentId,
        versionId,
        isDirectAccess
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      window.metrics?.track("version:created_last_version");

      const { callBack, documentId, repoId } = values;
      queryClient.invalidateQueries({
        queryKey: [`get-last-version-document-${documentId}-repo-${repoId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useSetLastVersion;
