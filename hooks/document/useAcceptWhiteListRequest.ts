import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { acceptWhiteListRequestAction } from "@actions/document";
import { handleClientSideHookError } from "@utils/error";
import { toast } from "react-toastify";

const useAcceptWhiteListRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["acceptWhiteListRequest"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      requestId: number;
      callBack?: () => void;
    }) => {
      const { repoId, documentId, requestId } = values;
      const response = await acceptWhiteListRequestAction(repoId, documentId, requestId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, documentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`repo-${repoId}-document-${documentId}-white-list-requests`],
      });
      queryClient.invalidateQueries({
        queryKey: [`repo-${repoId}-white-list-requests`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useAcceptWhiteListRequest;
