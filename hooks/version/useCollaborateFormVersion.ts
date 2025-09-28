import { collaborateFormVersionAction } from "@actions/version";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useCollaborateFormVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["collaborateFormVersion"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      versionId: number;
      callBack?: () => void;
      onErrorHandler?: () => void;
    }) => {
      const { repoId, documentId, versionId } = values;
      const response = await collaborateFormVersionAction(repoId, documentId, versionId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, documentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`version-list-${repoId}-${documentId}`],
      });
      callBack?.();
    },
    onError: (error, values) => {
      const { onErrorHandler } = values;

      toast.error(error.message || "خطای نامشخصی رخ داد");
      onErrorHandler?.();
    },
  });
};

export default useCollaborateFormVersion;
