import { deleteVersionAction } from "@actions/version";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useDeleteVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteVersion"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      versionId: number;
      state: string;
      callBack?: () => void;
    }) => {
      const { repoId, documentId, state, versionId } = values;
      const response = await deleteVersionAction(
        repoId,
        documentId,
        versionId,
        state,
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, documentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`get-last-version-document-${documentId}`],
      });
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

export default useDeleteVersion;
