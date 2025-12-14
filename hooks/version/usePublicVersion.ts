import { publicVersionAction } from "@actions/version";
import { IAddVersion } from "@interface/version.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const usePublicVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["publicVersion"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      versionId: number;
      isDirectAccess?: boolean;
      callBack?: () => void;
    }) => {
      const { repoId, documentId, versionId, isDirectAccess } = values;
      const response = await publicVersionAction(
        repoId,
        documentId,
        versionId,
        isDirectAccess
      );
      handleClientSideHookError(response as IActionError);
      return response as IAddVersion;
    },
    onSuccess: (response, values) => {
      window.metrics?.track("version:public");

      const { callBack, repoId, documentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`get-last-version-document-${documentId}-repo-${repoId}`],
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

export default usePublicVersion;
