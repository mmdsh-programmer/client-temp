import { saveVersionAction } from "@actions/editor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

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
      callBack?: () => void;
    }) => {
      const { repoId, documentId, versionId, versionNumber, content, outline } =
        values;
      const response = await saveVersionAction(
        repoId,
        documentId,
        versionId,
        versionNumber,
        content,
        outline
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { documentId, versionId, versionState, callBack } = values;
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
      
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useSaveEditor;
