import { createFileVersionAction } from "@actions/version";
import { IFileVersion } from "@interface/version.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useCreateFileVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createFileVersion"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      versionNumber: string;
      fileHash?: IFileVersion;
      isDirectAccess?: boolean;
      callBack?: () => void;
      onErrorHandler?: () => void;
    }) => {
      const { repoId, documentId, versionNumber, fileHash, isDirectAccess } = values;
      const response = await createFileVersionAction(
        repoId,
        documentId,
        versionNumber,
        fileHash,
        isDirectAccess,
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      window.metrics?.track("version:created_file");

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

export default useCreateFileVersion;
