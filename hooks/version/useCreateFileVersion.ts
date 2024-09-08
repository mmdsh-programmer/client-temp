import { createFileVersionAction } from "@actions/version";
import { IFileVersion } from "@interface/version.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCreateFileVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createFileVersion"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      versionNumber: string;
      fileHash?: IFileVersion;
      callBack?: () => void;
    }) => {
      const { repoId, documentId, versionNumber, fileHash } = values;
      const response = await createFileVersionAction(
        repoId,
        documentId,
        versionNumber,
        fileHash,
      );
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, documentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`version-list-${repoId}-${documentId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreateFileVersion;
