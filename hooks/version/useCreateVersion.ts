import { createVersionAction } from "@actions/version";
import { IAddVersion } from "@interface/version.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCreateVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createVersion"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      versionNumber: string;
      content: string;
      outline: string;
      callBack?: () => void;
    }) => {
      const { repoId, documentId, versionNumber, content, outline } = values;
      const response = await createVersionAction(
        repoId,
        documentId,
        versionNumber,
        content,
        outline,
      );
      return response as IAddVersion;
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

export default useCreateVersion;
