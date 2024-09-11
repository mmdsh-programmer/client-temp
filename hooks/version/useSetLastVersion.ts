import { setLastVersionAction } from "@actions/version";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useSetLastVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-last-version"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      versionId: number;
      callBack?: () => void;
    }) => {
      const { repoId, documentId, versionId } = values;
      const response = await setLastVersionAction(
        repoId,
        documentId,
        versionId,
      );
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, documentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`get-last-version-document-${documentId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useSetLastVersion;
