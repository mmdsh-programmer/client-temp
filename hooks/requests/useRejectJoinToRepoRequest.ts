import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { rejectUserToRepoRequestAction } from "@actions/requests";
import { toast } from "react-toastify";

const useRejectJoinToRepoRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["reject-join-to-repo-request"],
    mutationFn: async (values: {
      requestId: number;
      callBack?: () => void;
    }) => {
      const { requestId } = values;
      const response = await rejectUserToRepoRequestAction(requestId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      queryClient.invalidateQueries({
        queryKey: ["userJoinRepoRequests"],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useRejectJoinToRepoRequest;
