import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { saveFileVersionAction } from "@actions/editor";

const useSaveFileEditor = () => {
  return useMutation({
    mutationKey: ["update-file-version-content"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      versionId: number;
      versionNumber: string;
      fileHash: {
        hash: string;
        fileName: string;
        fileExtension: string;
      };
      isDirectAccess?: boolean;
      callBack?: () => void;
    }) => {
      const {
        repoId,
        documentId,
        versionId,
        isDirectAccess,
        versionNumber,
        fileHash,
      } = values;
      const response = await saveFileVersionAction(
        repoId,
        documentId,
        versionId,
        versionNumber,
        fileHash,
        isDirectAccess
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useSaveFileEditor;
