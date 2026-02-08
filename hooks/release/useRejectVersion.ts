import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { rejectVersionAction } from "@actions/releaseDocs";

const useRejectVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["rejectVersion"],
    mutationFn: async (values: {
      repoId: number;
      docId: number;
      versionId: number;
      isDirectAccess?: boolean;
      callBack?: () => void;
    }) => {
      const { repoId, versionId, isDirectAccess } = values;
      const response = await rejectVersionAction(repoId, versionId, isDirectAccess);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, docId } = values;
      queryClient.invalidateQueries({
        queryKey: [`pending-version-${repoId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`version-list-${repoId}-${docId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useRejectVersion;
