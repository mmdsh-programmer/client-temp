import { useMutation } from "@tanstack/react-query";
import { IDocument } from "@interface/document.interface";
import { documentEnableUserGroupHashAction } from "@actions/document";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useEnableGroupHash = () => {
  return useMutation({
    mutationKey: ["enable-user-group-hash"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      isDirectAccess?: boolean;
      callBack?: (result) => void;
    }) => {
      const { repoId, documentId, isDirectAccess } = values;
      const response = await documentEnableUserGroupHashAction(
        repoId,
        documentId,
        isDirectAccess
      );
      handleClientSideHookError(response as IActionError);
      return response as IDocument;
    },
    onSuccess: (response, values) => {
      window.metrics?.track("document:enable_groupHash");
      const { callBack } = values;
      callBack?.(response);
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useEnableGroupHash;
