import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IActionError } from "@interface/app.interface";
import { acceptVersionAction } from "@actions/releaseDocs";
import { handleClientSideHookError } from "@utils/error";
import { toast } from "react-toastify";

const useAcceptVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["acceptVersion"],
    mutationFn: async (values: {
      repoId: number;
      docId: number;
      versionId: number;
      isDirectAccess?: boolean;
      callBack?: () => void;
    }) => {
      const { repoId, versionId, docId, isDirectAccess } = values;
      const response = await acceptVersionAction(repoId, docId, versionId, isDirectAccess);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, docId } = values;
      queryClient.invalidateQueries({
        queryKey: [`pending-verison-${repoId}`],
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

export default useAcceptVersion;
