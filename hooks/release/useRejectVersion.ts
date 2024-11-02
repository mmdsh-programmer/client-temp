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
      versionId: number;
      callBack?: () => void;
    }) => {
      const { repoId, versionId } = values;
      const response = await rejectVersionAction(repoId, versionId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({
        queryKey: [`pending-version-${repoId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useRejectVersion;
