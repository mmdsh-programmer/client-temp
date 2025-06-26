import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { saveVersionAction } from "@actions/editor";
import { toast } from "react-toastify";

const useSaveEditor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-version-content"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      versionId: number;
      versionNumber: string;
      content: string;
      outline: string;
      versionState: string;
      isDirectAccess?: boolean;
      successCallBack?: () => void;
      errorCallback?: () => void;
    }) => {
      const {
        repoId,
        documentId,
        versionId,
        isDirectAccess,
        versionNumber,
        content,
        outline,
      } = values;
      const response = await saveVersionAction(
        repoId,
        documentId,
        versionId,
        encodeURIComponent(versionNumber),
        encodeURIComponent(content),
        encodeURIComponent(outline),
        isDirectAccess
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { documentId, versionId, versionState, successCallBack } = values;
      queryClient.refetchQueries({
        queryKey: [
          `document-${documentId}-version-${versionId}-state-${versionState}-innerDocument-true-innerOutline-true`,
        ],
      });

      queryClient.refetchQueries({
        queryKey: [
          `document-${documentId}-version-${versionId}-state-${versionState}-innerDocument-false-innerOutline-false`,
        ],
      });

      successCallBack?.();
    },
    onError: (error, values) => {
      const { errorCallback } = values;
      errorCallback?.();
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useSaveEditor;
