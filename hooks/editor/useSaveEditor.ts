import { saveVersionAction } from "@actions/editor";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useSaveEditor = () => {
  return useMutation({
    mutationKey: ["update-version-content"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      versionId: number;
      versionNumber: string;
      content: string;
      outline: string;
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
      const { callBack} = values;
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useSaveEditor;
