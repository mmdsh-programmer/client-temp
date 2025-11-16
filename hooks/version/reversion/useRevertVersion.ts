import { revertVersionAction } from "@actions/version";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useRevertVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["revertVersion"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      versionId: number;
      versionIndex: number;
      transaction?: boolean;
      innerDocument: boolean;
      innerOutline: boolean;
      callBack?: () => void;
      onErrorHandler?: () => void;
    }) => {
      const { repoId, documentId, versionId, versionIndex, transaction } = values;
      const response = await revertVersionAction(
        repoId,
        documentId,
        versionId,
        versionIndex,
        transaction,
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, versionId, documentId, innerDocument, innerOutline } = values;
      queryClient.invalidateQueries({
        queryKey: [`document-${documentId}-version-${versionId}-history`],
      });
      queryClient.invalidateQueries({
        queryKey: [
          `document-${documentId}-version-${versionId}-state-draft-innerDocument-${innerDocument}-innerOutline-${innerOutline}`,
        ],
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

export default useRevertVersion;
