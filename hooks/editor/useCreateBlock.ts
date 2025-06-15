/* eslint-disable @typescript-eslint/no-explicit-any */

import { IActionError } from "@interface/app.interface";
import { IBLockDocument } from "@interface/editor.interface";
import { createBlockVersionAction } from "@actions/editor";
import { handleClientSideHookError } from "@utils/error";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const useCreateBlock = () => {
  return useMutation({
    mutationKey: ["create-block"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      versionId: number;
      isDirectAccess?: boolean;
      callBack?: (result: IBLockDocument) => void;
      handleError?: (error?: any) => void;
    }) => {
      const { repoId, documentId, versionId, isDirectAccess} =
        values;
      const response = await createBlockVersionAction(
        repoId,
        documentId,
        versionId,
        isDirectAccess
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      callBack?.(response as IBLockDocument);
    },
    onError: (error, values) => {
      const { handleError } = values;
      handleError?.(error);
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreateBlock;
