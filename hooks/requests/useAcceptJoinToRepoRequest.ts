import { acceptUserToRepoRequestAction } from "@actions/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useAcceptJoinToRepoRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["accept-join-to-repo-request"],
    mutationFn: async (values: {
      requestId: number;
      callBack?: () => void;
    }) => {
      const { requestId } = values;
      const response = await acceptUserToRepoRequestAction(requestId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      queryClient.invalidateQueries({
        queryKey: ["userJoinRepoRequests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getMyInfo"],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useAcceptJoinToRepoRequest;
