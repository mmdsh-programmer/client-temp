import { createBlockVersionAction } from "@actions/editor";
import { IBLockDocument } from "@interface/editor.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCreateBlock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-block"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      versionId: number;
      callBack?: (result: IBLockDocument) => void;
      handleError?: () => void;
    }) => {
      const { repoId, documentId, versionId} =
        values;
      const response = await createBlockVersionAction(
        repoId,
        documentId,
        versionId,
      );
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      callBack?.(response as IBLockDocument);
    },
    onError: (error, values) => {
      const { handleError } = values;
      handleError?.();
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreateBlock;
